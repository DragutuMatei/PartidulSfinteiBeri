import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { Proiecte } from "./Proiecte";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number; 

  @Field()
  @Column({nullable:true})
  proiecte: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
