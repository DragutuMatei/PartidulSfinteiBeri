import { gql } from 'graphql-tag';
import { CreatePostMutation, PostsQuery, PostsDocument, VoteMutation, VoteMutationVariables } from './../generated/graphql';
import { Resolver } from '@urql/exchange-graphcache';
import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import {
    cacheExchange,
} from "@urql/exchange-graphcache";
import { betterUpdatedQuery } from "../pages/betterUpdatedQuery";
import {
    GetLoggedUserDocument,
    GetLoggedUserQuery,
    LoginMutation,
    LogoutMutation,
    RegisterMutation
} from "../generated/graphql";
import { pipe, tap } from "wonka";
import Router from "next/router";

const errorExchange: Exchange = ({ forward }) => ops$ => {
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            if (error) {
                if (error?.message.includes("nu esti logat")) {
                    Router.replace("/login");
                }
            }
        })
    );
}


// export const cursorPagination = (): Resolver => {
//     return (_parent, fieldArgs, cache, info) => {
//         const { parentKey: entityKey, fieldName } = info;
//         const allFields = cache.inspectFields(entityKey);

//         const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
//         const size = fieldInfos.length;

//         if (size === 0) {
//             return undefined;
//         }

//         let results: string[] = [];
//         let hasMore = true;
//         const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;

//         const isItInTheCache = cache.resolve(cache.resolve(entityKey, fieldKey) as string, "posts");

//         info.partial = !isItInTheCache;

//         fieldInfos.forEach(fi => {
//             const key = cache.resolve(entityKey, fi.fieldKey) as string;
//             const data = cache.resolve(key, "posts") as string[];
//             const _hasMore = cache.resolve(key, "hasMore");
//             if (!_hasMore) {
//                 hasMore = _hasMore as boolean;
//             }
//             results.push(...data);
//         })

//         return {
//             __typename: "PaginatedPosts",
//             hasMore,
//             results: results
//         };
//     };
// };

const cursorPagination = (): Resolver => {
    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }

        const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
        const isItInTheCache = cache.resolve(
            cache.resolve(entityKey, fieldKey) as string,
            "posts"
        );
        info.partial = !isItInTheCache;
        let hasMore = true;
        const results: string[] = [];
        let data = [];
        fieldInfos.forEach((fi) => {
            const key = cache.resolve(entityKey, fi.fieldKey) as string;
            data = cache.resolve(key, "posts") as string[];
            console.log(data);

            const _hasMore = cache.resolve(key, "hasMore");
            if (!_hasMore) {
                hasMore = _hasMore as boolean;
            }
            results.push(...data);
        });
        console.log("results: ", results);

        console.log("pula mea functioneaza");

        return {
            __typename: "PaginatedPosts",
            hasMore,
            posts: results,
        };
    };
};

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: "include" as const,
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            // keys: {
            //     PaginatedPosts: () => null,
            // },
            resolvers: {
                Query: {
                    // posts: cursorPagination()
                }
            },
            updates: {
                Mutation: {
                    vote: (_result, args, cache, info) => {
                        // cache.invalidate("Query", "posts", {});

                        const { postId, value } = args as VoteMutationVariables;
                        const data = cache.readFragment(
                            gql`
                                fragment
                            `
                        );

                        // betterUpdatedQuery<VoteMutation, PostsQuery>(
                        //     cache,
                        //     { query: PostsDocument },
                        //     _result,
                        //     (result, query) => {
                        //         console.log("info: ", info);
                        //         console.log("result: ", result);
                        //         console.log("query: ", query);
                        //         return query;
                        //     }
                        // );

                    },
                    createPost: (_result, args, cache, info) => {
                        const allFiedls = cache.inspectFields('Query');
                        const fieldInfos = allFiedls.filter((info) => info.fieldName === 'posts');

                        fieldInfos.forEach((fields) => {
                            cache.invalidate("Query", "posts", fields.arguments);
                        })

                        //sau:
                        // cache.invalidate("Query", "posts", {});

                    },
                    logout: (_result, args, cache, info) => {
                        betterUpdatedQuery<LogoutMutation, GetLoggedUserQuery>(
                            cache,
                            { query: GetLoggedUserDocument },
                            _result,
                            () => ({ getLoggedUser: null })
                        );
                    },
                    login: (_result, args, cache, info) => {
                        betterUpdatedQuery<LoginMutation, GetLoggedUserQuery>(
                            cache,
                            { query: GetLoggedUserDocument },
                            _result,
                            (result, query) => {
                                if (result.login.errors) {
                                    return query;
                                } else {
                                    return {
                                        getLoggedUser: result.login.user,
                                    };
                                }
                            }
                        );
                    },
                    register: (_result, args, cache, info) => {
                        betterUpdatedQuery<RegisterMutation, GetLoggedUserQuery>(
                            cache,
                            { query: GetLoggedUserDocument },
                            _result,
                            (result, query) => {
                                if (result.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        getLoggedUser: result.register.user,
                                    };
                                }
                            }
                        );
                    },
                },
            },
        }),
        errorExchange,
        ssrExchange,
        fetchExchange,
    ],
});



