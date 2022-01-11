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
exports.SedinteResolver = void 0;
const Sedinte_1 = require("../entities/Sedinte");
const type_graphql_1 = require("type-graphql");
let SedintaInput = class SedintaInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SedintaInput.prototype, "topic", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SedintaInput.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SedintaInput.prototype, "userId", void 0);
SedintaInput = __decorate([
    (0, type_graphql_1.InputType)()
], SedintaInput);
let SedinteResolver = class SedinteResolver {
    async addSedinta(values) {
        return await Sedinte_1.Sedinte.create(Object.assign({}, values)).save();
    }
    async getSedinte(proiectId) {
        return await Sedinte_1.Sedinte.find({ proiectId });
    }
    async deleteSedinta(sedintaId) {
        const sedinta = await Sedinte_1.Sedinte.delete({ id: sedintaId });
        if (sedinta)
            return true;
        return false;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Sedinte_1.Sedinte),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SedintaInput]),
    __metadata("design:returntype", Promise)
], SedinteResolver.prototype, "addSedinta", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Sedinte_1.Sedinte]),
    __param(0, (0, type_graphql_1.Arg)("proiectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SedinteResolver.prototype, "getSedinte", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("sedintaId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SedinteResolver.prototype, "deleteSedinta", null);
SedinteResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SedinteResolver);
exports.SedinteResolver = SedinteResolver;
//# sourceMappingURL=sedinte.js.map