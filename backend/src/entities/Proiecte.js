"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Proiecte = void 0;
var type_graphql_1 = require("type-graphql");
var type_graphql_2 = require("type-graphql");
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Proiecte = /** @class */ (function (_super) {
    __extends(Proiecte, _super);
    function Proiecte() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, type_graphql_2.Field)(),
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Proiecte.prototype, "id");
    __decorate([
        (0, type_graphql_2.Field)(function () { return [User_1.User]; }),
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.proiecte; }, { nullable: true, eager: true })
    ], Proiecte.prototype, "userId");
    __decorate([
        (0, type_graphql_2.Field)(),
        (0, typeorm_1.Column)()
    ], Proiecte.prototype, "numeleProiectului");
    __decorate([
        (0, type_graphql_2.Field)(function () { return type_graphql_1.Int; }),
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.id; }, { eager: true })
    ], Proiecte.prototype, "sefId");
    __decorate([
        (0, type_graphql_2.Field)(),
        (0, typeorm_1.CreateDateColumn)()
    ], Proiecte.prototype, "createdAt");
    __decorate([
        (0, type_graphql_2.Field)(function () { return Date; }),
        (0, typeorm_1.UpdateDateColumn)({ type: 'date' })
    ], Proiecte.prototype, "updatedAt");
    Proiecte = __decorate([
        (0, typeorm_1.Entity)(),
        (0, type_graphql_2.ObjectType)()
    ], Proiecte);
    return Proiecte;
}(typeorm_1.BaseEntity));
exports.Proiecte = Proiecte;
