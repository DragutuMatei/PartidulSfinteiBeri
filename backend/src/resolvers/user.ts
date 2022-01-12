import { validateRegister } from './../utils/validateRegister';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from './../constants';
import { User } from "./../entities/User";
import { MyContext } from "./../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2d from "argon2";
import { UserInput } from './UserInput';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';
import { getConnection } from 'typeorm';

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class UserR {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  email: string

}

@Resolver(User)
export class UserResolver {

  @Query(() => Boolean)
  async checkIfExists(
    @Arg("email") email: string
  ) {
    const user = await User.findOne({ email });
    if (user) {
      return true;
    }
    return false;
  }

  @Mutation(() => UserR)
  async getUserByEmail(
    @Arg("email") email: string
  ): Promise<UserR | undefined> {
    console.log(email)
    const user = await User.findOne({ email: email });
    console.log(user);
    return user;
  }


  @Mutation(() => UserR)
  async getUserById(
    @Arg("id") id: number
  ): Promise<UserR> {
    const user = await User.findOneOrFail(id);
    console.log(user);
    return user;
  }
  @Query(() => UserR)
  async getUserByIdQ(
    @Arg("id") id: number
  ): Promise<UserR> {
    const user = await User.findOneOrFail(id);
    console.log(user);
    return user;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length < 3) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "lenght must be at least 3",
          },
        ]
      }
    }

    const key = FORGET_PASSWORD_PREFIX + token;

    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          }
        ]
      }
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists',
          }
        ]
      }
    }

    await User.update({ id: userIdNum }, {
      password: await argon2d.hash(newPassword)
    });

    await redis.del(key);

    req.session.userId = user.id;

    return { user }

  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    const token = v4();

    await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3);

    sendEmail(email, `<a href="http://localhost:3000/change-password/${token}">reset</a>`);

    return true;
  }


  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors)
      return { errors };

    const hashedPas = await argon2d.hash(options.password);
    // const user = em.create(User, {
    //   username: options.username,
    //   password: hashedPas,
    // });
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(
          {
            username: options.username,
            password: hashedPas,
            email: options.email,
          }

        ).returning("*").execute(); console.log(result);
      user = result.raw[0] as any;
    } catch (err) {
      console.log(err);
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where:
        usernameOrEmail.includes('@') ?
          { email: usernameOrEmail } :
          { username: usernameOrEmail }
    }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that username does not exist",
          },
        ],
      };
    }

    const valid = await argon2d.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorect password",
          },
        ],
      };
    }

    req.session.userId = user.id;
    console.log(req.session);
    return { user: user };
  }

  @Query(() => [User])
  async getSomeUsers(
    @Arg("ids") ids: string,
  ): Promise<User[]> {
    let arr = [];
    let arra = ids.split(",").filter((o) => o != " ");
    console.log(arra)
    for (let i = 0; i < arra.length; i++) {
      console.log(arra[i])
      const user = await User.findOneOrFail({ id: parseInt(arra[i]) });
      arr.push(user);
    }
    return arr;
  }

  @Query(() => User, { nullable: true })
  getLoggedUser(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);

  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME)
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
