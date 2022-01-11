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
exports.ProiecteResolver = void 0;
const isAuth_1 = require("./../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const Proiecte_1 = require("../entities/Proiecte");
let ProiecteInput = class ProiecteInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProiecteInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProiecteInput.prototype, "numeleProiectului", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ProiecteInput.prototype, "sefId", void 0);
ProiecteInput = __decorate([
    (0, type_graphql_1.InputType)()
], ProiecteInput);
let ProiecteResolver = class ProiecteResolver {
    async createProiect(values) {
        return await Proiecte_1.Proiecte.create({
            sefId: values.sefId,
            numeleProiectului: values.numeleProiectului,
            userId: values.userId + ", "
        }).save();
    }
    async deleteProiect(id) {
        try {
            await Proiecte_1.Proiecte.delete(id);
        }
        catch (_a) {
            return false;
        }
        return true;
    }
    async getAllProiecte({ req }) {
        const proiecte = await Proiecte_1.Proiecte.find();
        let pr = [];
        console.log(req.session.userId);
        proiecte.forEach(proiect => {
            if (proiect.sefId == req.session.userId)
                pr.push(proiect);
            else if (proiect.userId.includes(req.session.userId.toString())) {
                pr.push(proiect);
            }
        });
        return pr;
    }
    async addUser(idUserAdd, proiectId) {
        const proiect = await Proiecte_1.Proiecte.findOne({ id: proiectId });
        await Proiecte_1.Proiecte.update({ id: proiectId }, { userId: (proiect === null || proiect === void 0 ? void 0 : proiect.userId) + idUserAdd.toString() + ", " });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Proiecte_1.Proiecte),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProiecteInput]),
    __metadata("design:returntype", Promise)
], ProiecteResolver.prototype, "createProiect", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProiecteResolver.prototype, "deleteProiect", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Proiecte_1.Proiecte]),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProiecteResolver.prototype, "getAllProiecte", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("idUserAdd")),
    __param(1, (0, type_graphql_1.Arg)("proiectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProiecteResolver.prototype, "addUser", null);
ProiecteResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProiecteResolver);
exports.ProiecteResolver = ProiecteResolver;
//# sourceMappingURL=proiecte.js.map