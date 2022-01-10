import { Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field } from 'type-graphql';
import { ObjectType } from 'type-graphql';
import { BaseEntity, Entity } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
    @Field()
    @PrimaryColumn()
    userId: number;

    @Field()
    @PrimaryColumn()
    postId: number;

    @Field()
    @Column({ type: "int" })
    value: number;

    @Field()
    @ManyToOne(() => User, (user) => user.updoots)
    user: User;

    @Field(() => Post)
    @ManyToOne(() => Post, (post) => post.updoots)
    post: Post;
}