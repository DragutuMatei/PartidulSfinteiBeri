"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserResolver = void 0;
var validateRegister_1 = require("./../utils/validateRegister");
var constants_1 = require("./../constants");
var User_1 = require("./../entities/User");
var type_graphql_1 = require("type-graphql");
var argon2_1 = require("argon2");
var sendEmail_1 = require("../utils/sendEmail");
var uuid_1 = require("uuid");
var typeorm_1 = require("typeorm");
var FieldError = /** @class */ (function () {
    function FieldError() {
    }
    __decorate([
        (0, type_graphql_1.Field)()
    ], FieldError.prototype, "field");
    __decorate([
        (0, type_graphql_1.Field)()
    ], FieldError.prototype, "message");
    FieldError = __decorate([
        (0, type_graphql_1.ObjectType)()
    ], FieldError);
    return FieldError;
}());
var UserResponse = /** @class */ (function () {
    function UserResponse() {
    }
    __decorate([
        (0, type_graphql_1.Field)(function () { return [FieldError]; }, { nullable: true })
    ], UserResponse.prototype, "errors");
    __decorate([
        (0, type_graphql_1.Field)(function () { return User_1.User; }, { nullable: true })
    ], UserResponse.prototype, "user");
    UserResponse = __decorate([
        (0, type_graphql_1.ObjectType)()
    ], UserResponse);
    return UserResponse;
}());
var UserResolver = /** @class */ (function () {
    function UserResolver() {
    }
    UserResolver.prototype.checkIfExists = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    UserResolver.prototype.changePassword = function (token, newPassword, _a) {
        var redis = _a.redis, req = _a.req;
        return __awaiter(this, void 0, void 0, function () {
            var key, userId, userIdNum, user, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (newPassword.length < 3) {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: "newPassword",
                                            message: "lenght must be at least 3"
                                        },
                                    ]
                                }];
                        }
                        key = constants_1.FORGET_PASSWORD_PREFIX + token;
                        return [4 /*yield*/, redis.get(key)];
                    case 1:
                        userId = _f.sent();
                        if (!userId) {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: 'token',
                                            message: 'token expired'
                                        }
                                    ]
                                }];
                        }
                        userIdNum = parseInt(userId);
                        return [4 /*yield*/, User_1.User.findOne(userIdNum)];
                    case 2:
                        user = _f.sent();
                        if (!user) {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: 'token',
                                            message: 'user no longer exists'
                                        }
                                    ]
                                }];
                        }
                        _c = (_b = User_1.User).update;
                        _d = [{ id: userIdNum }];
                        _e = {};
                        return [4 /*yield*/, argon2_1["default"].hash(newPassword)];
                    case 3: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.password = _f.sent(),
                                _e)]))];
                    case 4:
                        _f.sent();
                        return [4 /*yield*/, redis.del(key)];
                    case 5:
                        _f.sent();
                        req.session.userId = user.id;
                        return [2 /*return*/, { user: user }];
                }
            });
        });
    };
    UserResolver.prototype.forgotPassword = function (email, _a) {
        var redis = _a.redis;
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({ where: { email: email } })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, true];
                        }
                        token = (0, uuid_1.v4)();
                        return [4 /*yield*/, redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3)];
                    case 2:
                        _b.sent();
                        (0, sendEmail_1.sendEmail)(email, "<a href=\"http://localhost:3000/change-password/" + token + "\">reset</a>");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UserResolver.prototype.register = function (options, _a) {
        var req = _a.req;
        return __awaiter(this, void 0, void 0, function () {
            var errors, hashedPas, user, result, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errors = (0, validateRegister_1.validateRegister)(options);
                        if (errors)
                            return [2 /*return*/, { errors: errors }];
                        return [4 /*yield*/, argon2_1["default"].hash(options.password)];
                    case 1:
                        hashedPas = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, typeorm_1.getConnection)()
                                .createQueryBuilder()
                                .insert()
                                .into(User_1.User)
                                .values({
                                username: options.username,
                                password: hashedPas,
                                email: options.email
                            }).returning("*").execute()];
                    case 3:
                        result = _b.sent();
                        console.log(result);
                        user = result.raw[0];
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        if (err_1.code === "23505") {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: "username",
                                            message: "username already taken"
                                        },
                                    ]
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 5:
                        req.session.userId = user.id;
                        return [2 /*return*/, { user: user }];
                }
            });
        });
    };
    UserResolver.prototype.login = function (usernameOrEmail, password, _a) {
        var req = _a.req;
        return __awaiter(this, void 0, void 0, function () {
            var user, valid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({
                            where: usernameOrEmail.includes('@') ?
                                { email: usernameOrEmail } :
                                { username: usernameOrEmail }
                        })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: "usernameOrEmail",
                                            message: "that username does not exist"
                                        },
                                    ]
                                }];
                        }
                        return [4 /*yield*/, argon2_1["default"].verify(user.password, password)];
                    case 2:
                        valid = _b.sent();
                        if (!valid) {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: "password",
                                            message: "incorect password"
                                        },
                                    ]
                                }];
                        }
                        req.session.userId = user.id;
                        console.log(req.session);
                        return [2 /*return*/, { user: user }];
                }
            });
        });
    };
    UserResolver.prototype.getLoggedUser = function (_a) {
        var req = _a.req;
        if (!req.session.userId) {
            return null;
        }
        return User_1.User.findOne(req.session.userId);
    };
    UserResolver.prototype.logout = function (_a) {
        var req = _a.req, res = _a.res;
        return new Promise(function (resolve) {
            return req.session.destroy(function (err) {
                res.clearCookie(constants_1.COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    };
    __decorate([
        (0, type_graphql_1.Query)(function () { return Boolean; }),
        __param(0, (0, type_graphql_1.Arg)("email"))
    ], UserResolver.prototype, "checkIfExists");
    __decorate([
        (0, type_graphql_1.Mutation)(function () { return UserResponse; }),
        __param(0, (0, type_graphql_1.Arg)('token')),
        __param(1, (0, type_graphql_1.Arg)('newPassword')),
        __param(2, (0, type_graphql_1.Ctx)())
    ], UserResolver.prototype, "changePassword");
    __decorate([
        (0, type_graphql_1.Mutation)(function () { return Boolean; }),
        __param(0, (0, type_graphql_1.Arg)("email")),
        __param(1, (0, type_graphql_1.Ctx)())
    ], UserResolver.prototype, "forgotPassword");
    __decorate([
        (0, type_graphql_1.Mutation)(function () { return UserResponse; }),
        __param(0, (0, type_graphql_1.Arg)("options")),
        __param(1, (0, type_graphql_1.Ctx)())
    ], UserResolver.prototype, "register");
    __decorate([
        (0, type_graphql_1.Mutation)(function () { return UserResponse; }),
        __param(0, (0, type_graphql_1.Arg)("usernameOrEmail")),
        __param(1, (0, type_graphql_1.Arg)("password")),
        __param(2, (0, type_graphql_1.Ctx)())
    ], UserResolver.prototype, "login");
    __decorate([
        (0, type_graphql_1.Query)(function () { return User_1.User; }, { nullable: true }),
        __param(0, (0, type_graphql_1.Ctx)())
    ], UserResolver.prototype, "getLoggedUser");
    __decorate([
        (0, type_graphql_1.Mutation)(function () { return Boolean; }),
        __param(0, (0, type_graphql_1.Ctx)())
    ], UserResolver.prototype, "logout");
    UserResolver = __decorate([
        (0, type_graphql_1.Resolver)(User_1.User)
    ], UserResolver);
    return UserResolver;
}());
exports.UserResolver = UserResolver;
