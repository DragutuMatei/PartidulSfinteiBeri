"use strict";
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
require("reflect-metadata");
var proiecte_1 = require("./resolvers/proiecte");
var Proiecte_1 = require("./entities/Proiecte");
var apollo_server_core_1 = require("apollo-server-core");
var constants_1 = require("./constants");
var express_1 = require("express");
var apollo_server_express_1 = require("apollo-server-express");
var type_graphql_1 = require("type-graphql");
var user_1 = require("./resolvers/user");
var ioredis_1 = require("ioredis");
var express_session_1 = require("express-session");
var connect_redis_1 = require("connect-redis");
var cors_1 = require("cors");
var typeorm_1 = require("typeorm");
var User_1 = require("./entities/User");
var path_1 = require("path");
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, app, RedisStore, redis, apolloServer, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.createConnection)({
                    type: "postgres",
                    database: "tryme",
                    password: "Ericsson1!",
                    username: "postgres",
                    logging: true,
                    migrations: [path_1["default"].join(__dirname, "./migrations/*")],
                    synchronize: true,
                    entities: [User_1.User, Proiecte_1.Proiecte]
                })];
            case 1:
                conn = _c.sent();
                return [4 /*yield*/, conn.runMigrations()];
            case 2:
                _c.sent();
                app = (0, express_1["default"])();
                RedisStore = (0, connect_redis_1["default"])(express_session_1["default"]);
                redis = new ioredis_1["default"]();
                app.use((0, cors_1["default"])({
                    origin: "http://localhost:3000",
                    credentials: true
                }));
                app.use((0, express_session_1["default"])({
                    name: constants_1.COOKIE_NAME,
                    store: new RedisStore({
                        client: redis,
                        disableTouch: true
                    }),
                    cookie: {
                        maxAge: 1000 * 60 * 60 * 24 * 360 * 10,
                        httpOnly: true,
                        sameSite: "lax",
                        secure: constants_1.__prod__
                    },
                    saveUninitialized: false,
                    secret: "nush",
                    resave: false
                }));
                _a = apollo_server_express_1.ApolloServer.bind;
                _b = {};
                return [4 /*yield*/, (0, type_graphql_1.buildSchema)({
                        resolvers: [user_1.UserResolver, proiecte_1.ProiecteResolver],
                        validate: false
                    })];
            case 3:
                apolloServer = new (_a.apply(apollo_server_express_1.ApolloServer, [void 0, (_b.schema = _c.sent(),
                        _b.plugins = [
                            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)({}),
                        ],
                        _b.context = function (_a) {
                            var req = _a.req, res = _a.res;
                            return ({ req: req, res: res, redis: redis });
                        },
                        _b)]))();
                return [4 /*yield*/, apolloServer.start()];
            case 4:
                _c.sent();
                apolloServer.applyMiddleware({
                    app: app,
                    cors: false
                });
                app.listen(4000, function () {
                    console.log("listen");
                });
                return [2 /*return*/];
        }
    });
}); };
main()["catch"](function (err) { return console.log(err); });
