import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Tasks extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    task: string;

    @Field()
    @Column()
    userId: number;

    @Field()
    @Column()
    sefId: number;

    @Field()
    @Column()
    proiectId: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    points?: number;

    @Field({ defaultValue: false })
    @Column({ default: false })
    finish: boolean;

    @Field()
    @Column({ nullable: true })
    deadline: string;
}