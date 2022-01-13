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
exports.TasksResolver = void 0;
const Tasks_1 = require("../entities/Tasks");
const type_graphql_1 = require("type-graphql");
let TaskInput = class TaskInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TaskInput.prototype, "task", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TaskInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TaskInput.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TaskInput.prototype, "sefId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TaskInput.prototype, "proiectId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], TaskInput.prototype, "points", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], TaskInput.prototype, "finish", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TaskInput.prototype, "deadline", void 0);
TaskInput = __decorate([
    (0, type_graphql_1.InputType)()
], TaskInput);
let TasksResolver = class TasksResolver {
    async addTask(values) {
        return await Tasks_1.Tasks.create(Object.assign({}, values)).save();
    }
    async addPoints(taskId, points) {
        console.log(taskId);
        const task = await Tasks_1.Tasks.update({ id: taskId }, { points });
        if (task) {
            return true;
        }
        return false;
    }
    async finish(taskId) {
        const task = await Tasks_1.Tasks.update({ id: taskId }, { finish: true });
        if (task)
            return true;
        return false;
    }
    async getTasks({ req }) {
        const tasks = await Tasks_1.Tasks.find({ order: { id: "DESC" } });
        let ts = [];
        tasks.forEach(task => {
            if (task.sefId == req.session.userId) {
                ts.push(task);
            }
            else if (task.userId == req.session.userId) {
                ts.push(task);
            }
        });
        return ts;
    }
    async deleteTask(taskId, { req }) {
        const task = await Tasks_1.Tasks.findOne();
        if ((task === null || task === void 0 ? void 0 : task.sefId) != req.session.userId) {
            return false;
        }
        else {
            await Tasks_1.Tasks.delete({ id: taskId });
            return true;
        }
    }
    async getTaskByProiect(proiectId) {
        return await Tasks_1.Tasks.find({ where: { proiectId: proiectId } });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Tasks_1.Tasks),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskInput]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "addTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("taskId")),
    __param(1, (0, type_graphql_1.Arg)("points")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "addPoints", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("taskId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "finish", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Tasks_1.Tasks]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "getTasks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("taskId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "deleteTask", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Tasks_1.Tasks]),
    __param(0, (0, type_graphql_1.Arg)("proiectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksResolver.prototype, "getTaskByProiect", null);
TasksResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TasksResolver);
exports.TasksResolver = TasksResolver;
//# sourceMappingURL=tasks.js.map