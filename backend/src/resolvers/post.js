// import { Updoot } from '../entities/Updoot';
// import { MyContext } from './../types';
// import { getConnection } from 'typeorm';
// import { isAuth } from './../middleware/isAuth';
// import { Post } from "./../entities/Post";
// import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// @InputType()
// class PostInput {
//   @Field()
//   title: string;
//   @Field()
//   text: string;
// }
// // @ObjectType()
// // class PaginationPosts {
// //   @Field(() => [Post])
// //   posts: Post[];
// //   @Field()
// //   hasMore: boolean;
// // }
// @ObjectType()
// class Creator {
//   @Field()
//   id: number;
//   @Field()
//   username: string;
//   @Field()
//   email: string;
//   @Field()
//   createdAt: string;
//   @Field()
//   updatedAt: string;
// }
// @ObjectType()
// class AltPost {
//   @Field()
//   id: number;
//   @Field()
//   createdAt: Date;
//   @Field()
//   updatedAt: Date;
//   @Field()
//   title: string;
//   @Field()
//   text: string;
//   @Field()
//   points: number;
//   @Field(() => Creator)
//   creator: Creator;
// }
// @Resolver(AltPost)
// export class PostsResolver {
//   @FieldResolver(() => String)
//   textSnippet(@Root() post: Post) {
//     return post.text.slice(0, 50);
//   }
//   @Mutation(() => Boolean)
//   @UseMiddleware(isAuth)
//   async vote(
//     @Arg("postId", () => Int) postId: number,
//     @Arg("value", () => Int) value: number,
//     @Ctx() { req }: MyContext
//   ) {
//     const isUpdoot = value !== -1;
//     const realValue = isUpdoot ? 1 : -1;
//     const { userId } = req.session;
var updoot = await Updoot.findOne({ where: { postId: postId, userId: userId } });
// the user has voted on the post before
// and they are changing their vote
if (updoot && updoot.value !== realValue) {
    await getConnection().transaction(function (tm) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tm.query("\n    update updoot\n    set value = $1\n    where \"postId\" = $2 and \"userId\" = $3\n        ", [realValue, postId, userId])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tm.query("\n          update post\n          set points = points + $1\n          where id = $2\n        ", [2 * realValue, postId])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
else if (!updoot) {
    // has never voted before
    await getConnection().transaction(function (tm) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tm.query("\n    insert into updoot (\"userId\", \"postId\", value)\n    values ($1, $2, $3)\n        ", [userId, postId, realValue])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tm.query("\n    update post\n    set points = points + $1\n    where id = $2\n      ", [realValue, postId])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
//     return true;
//   }
//   @Query(() => [AltPost])
//   async posts(
//   ): Promise<AltPost[]> {
//     const posts = await getConnection().query(`
//       select p.*,
//       json_build_object (
//         'id', u.id,
//         'username', u.username,
//         'email', u.email,
//         'createdAt', u."createdAt",
//         'updatedAt', u."updatedAt"
//       ) creator
//       from post p
//       inner join public.user u on u.id = p."creatorId"
//       order by p."createdAt" DESC;
//     `).catch(e => console.log(e));
//     console.log(posts);
//     return posts;
//   }
//   @Query(() => Post, { nullable: true })
//   post(@Arg("id") id: number): Promise<Post | undefined> {
//     return Post.findOne(id);
//   }
//   @Mutation(() => Post)
//   @UseMiddleware(isAuth)
//   async createPost(
//     @Ctx() { req }: MyContext,
//     @Arg("input") input: PostInput,
//   ): Promise<Post> {
//     return Post.create({
//       ...input,
//       creatorId: req.session.userId,
//     }).save();
//   }
//   @Mutation(() => Post, { nullable: true })
//   async updatePost(
//     @Arg("id") id: number,
//     @Arg("title", { nullable: true }) title: string,
//   ): Promise<Post | null> {
//     const post = await Post.findOne(id);
//     if (!post) {
//       return null;
//     }
//     if (typeof title !== "undefined") {
//       await Post.update({ id }, { title })
//     }
//     return post;
//   }
//   @Mutation(() => Boolean)
//   async deletePost(
//     @Arg("id") id: number,
//   ): Promise<boolean> {
//     // if (await em.nativeDelete(Post, { id })) return true;
//     // return false;
//     try {
//       await Post.delete(id);
//     } catch {
//       return false;
//     }
//     return true;
//   }
// }
