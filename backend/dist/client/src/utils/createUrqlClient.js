"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrqlClient = exports.amin = exports.cursorPagination = void 0;
const urql_1 = require("urql");
const exchange_graphcache_1 = require("@urql/exchange-graphcache");
const betterUpdatedQuery_1 = require("../pages/betterUpdatedQuery");
const graphql_1 = require("../generated/graphql");
const wonka_1 = require("wonka");
const router_1 = __importDefault(require("next/router"));
const errorExchange = ({ forward }) => ops$ => {
    return (0, wonka_1.pipe)(forward(ops$), (0, wonka_1.tap)(({ error }) => {
        if (error) {
            if (error === null || error === void 0 ? void 0 : error.message.includes("nu esti logat")) {
                router_1.default.replace("/login");
            }
        }
    }));
};
const cursorPagination = () => {
    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        let results = [];
        const fieldKey = `${fieldName}(${(0, urql_1.stringifyVariables)(fieldArgs)})`;
        const isItInTheCache = cache.resolve(entityKey, fieldKey);
        info.partial = !isItInTheCache;
        fieldInfos.forEach(fi => {
            const data = cache.resolve(entityKey, fi.fieldKey);
            results.push(...data);
        });
        return results;
    };
};
exports.cursorPagination = cursorPagination;
const amin = () => {
    return () => {
        console.log("amin in pula mea");
        return [];
    };
};
exports.amin = amin;
const createUrqlClient = (ssrExchange) => ({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: "include",
    },
    exchanges: [
        urql_1.dedupExchange,
        (0, exchange_graphcache_1.cacheExchange)({
            resolvers: {
                Query: {
                    posts: (0, exports.cursorPagination)()
                }
            },
            updates: {
                Mutation: {
                    logout: (_result, args, cache, info) => {
                        (0, betterUpdatedQuery_1.betterUpdatedQuery)(cache, { query: graphql_1.GetLoggedUserDocument }, _result, () => ({ getLoggedUser: null }));
                    },
                    login: (_result, args, cache, info) => {
                        (0, betterUpdatedQuery_1.betterUpdatedQuery)(cache, { query: graphql_1.GetLoggedUserDocument }, _result, (result, query) => {
                            if (result.login.errors) {
                                return query;
                            }
                            else {
                                return {
                                    getLoggedUser: result.login.user,
                                };
                            }
                        });
                    },
                    register: (_result, args, cache, info) => {
                        (0, betterUpdatedQuery_1.betterUpdatedQuery)(cache, { query: graphql_1.GetLoggedUserDocument }, _result, (result, query) => {
                            if (result.register.errors) {
                                return query;
                            }
                            else {
                                return {
                                    getLoggedUser: result.register.user,
                                };
                            }
                        });
                    },
                },
            },
        }),
        errorExchange,
        ssrExchange,
        urql_1.fetchExchange,
    ],
});
exports.createUrqlClient = createUrqlClient;
//# sourceMappingURL=createUrqlClient.js.map