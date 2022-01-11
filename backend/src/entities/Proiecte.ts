import { Int } from 'type-graphql';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
@ObjectType()
export class Proiecte extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    userId: string;

    @Field()
    @Column()
    numeleProiectului: string;

    @Field()
    @Column()
    sefId: number;
 
}