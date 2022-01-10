import { Updoot } from '../entities/Updoot';
import { MyContext } from './../types';
import { getConnection } from 'typeorm';
import { isAuth } from './../middleware/isAuth';
import { Post } from "./../entities/Post";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

// @ObjectType()
// class PaginationPosts {
//   @Field(() => [Post])
//   posts: Post[];
//   @Field()
//   hasMore: boolean;
// }


@ObjectType()
class Creator {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
class AltPost {
  @Field()
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  points: number;

  @Field(() => Creator)
  creator: Creator;
}


@Resolver(AltPost)
export class PostsResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 50);
  }


  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpdoot = value !== -1;
    const realValue = isUpdoot ? 1 : -1;
    const { userId } = req.session;

    const updoot = await Updoot.findOne({ where: { postId, userId } });

    // the user has voted on the post before
    // and they are changing their vote
    if (updoot && updoot.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
    update updoot
    set value = $1
    where "postId" = $2 and "userId" = $3
        `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
        `,
          [2 * realValue, postId]
        );
      });
    } else if (!updoot) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
    insert into updoot ("userId", "postId", value)
    values ($1, $2, $3)
        `,
          [userId, postId, realValue]
        );

        await tm.query(
          `
    update post
    set points = points + $1
    where id = $2
      `,
          [realValue, postId]
        );
      });
    }
    return true;
  }

  @Query(() => [AltPost])
  async posts(
  ): Promise<AltPost[]> {
    const posts = await getConnection().query(`
      select p.*,
      json_build_object (
        'id', u.id,
        'username', u.username,
        'email', u.email,
        'createdAt', u."createdAt",
        'updatedAt', u."updatedAt"
      ) creator
      from post p
      inner join public.user u on u.id = p."creatorId"
      order by p."createdAt" DESC;
    `).catch(e => console.log(e));
    console.log(posts);
    return posts;
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Ctx() { req }: MyContext,
    @Arg("input") input: PostInput,
  ): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", { nullable: true }) title: string,
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      await Post.update({ id }, { title })
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
  ): Promise<boolean> {
    // if (await em.nativeDelete(Post, { id })) return true;
    // return false;

    try {
      await Post.delete(id);
    } catch {
      return false;
    }
    return true;
  }
}
