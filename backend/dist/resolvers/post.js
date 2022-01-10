"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsResolver = void 0;
const Updoot_1 = require("../entities/Updoot");
const typeorm_1 = require("typeorm");
const isAuth_1 = require("./../middleware/isAuth");
const Post_1 = require("./../entities/Post");
const type_graphql_1 = require("type-graphql");
let PostInput = class PostInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "text", void 0);
PostInput = __decorate([
    (0, type_graphql_1.InputType)()
], PostInput);
let Creator = class Creator {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Creator.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Creator.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Creator.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Creator.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Creator.prototype, "updatedAt", void 0);
Creator = __decorate([
    (0, type_graphql_1.ObjectType)()
], Creator);
let AltPost = class AltPost {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AltPost.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AltPost.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AltPost.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AltPost.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AltPost.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AltPost.prototype, "points", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Creator),
    __metadata("design:type", Creator)
], AltPost.prototype, "creator", void 0);
AltPost = __decorate([
    (0, type_graphql_1.ObjectType)()
], AltPost);
let PostsResolver = class PostsResolver {
    textSnippet(post) {
        return post.text.slice(0, 50);
    }
    async vote(postId, value, { req }) {
        const isUpdoot = value !== -1;
        const realValue = isUpdoot ? 1 : -1;
        const { userId } = req.session;
        const updoot = await Updoot_1.Updoot.findOne({ where: { postId, userId } });
        if (updoot && updoot.value !== realValue) {
            await (0, typeorm_1.getConnection)().transaction(async (tm) => {
                await tm.query(`
    update updoot
    set value = $1
    where "postId" = $2 and "userId" = $3
        `, [realValue, postId, userId]);
                await tm.query(`
          update post
          set points = points + $1
          where id = $2
        `, [2 * realValue, postId]);
            });
        }
        else if (!updoot) {
            await (0, typeorm_1.getConnection)().transaction(async (tm) => {
                await tm.query(`
    insert into updoot ("userId", "postId", value)
    values ($1, $2, $3)
        `, [userId, postId, realValue]);
                await tm.query(`
    update post
    set points = points + $1
    where id = $2
      `, [realValue, postId]);
            });
        }
        return true;
    }
    async posts() {
        const posts = await (0, typeorm_1.getConnection)().query(`
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
    post(id) {
        return Post_1.Post.findOne(id);
    }
    async createPost({ req }, input) {
        return Post_1.Post.create(Object.assign(Object.assign({}, input), { creatorId: req.session.userId })).save();
    }
    async updatePost(id, title) {
        const post = await Post_1.Post.findOne(id);
        if (!post) {
            return null;
        }
        if (typeof title !== "undefined") {
            await Post_1.Post.update({ id }, { title });
        }
        return post;
    }
    async deletePost(id) {
        try {
            await Post_1.Post.delete(id);
        }
        catch (_a) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => String),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "textSnippet", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("postId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("value", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "vote", null);
__decorate([
    (0, type_graphql_1.Query)(() => [AltPost]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.Post),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("title", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "deletePost", null);
PostsResolver = __decorate([
    (0, type_graphql_1.Resolver)(AltPost)
], PostsResolver);
exports.PostsResolver = PostsResolver;
//# sourceMappingURL=post.js.map