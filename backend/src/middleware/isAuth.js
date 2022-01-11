"use strict";
exports.__esModule = true;
exports.isAuth = void 0;
var isAuth = function (_a, next) {
    var context = _a.context;
    if (!context.req.session.userId) {
        throw new Error('nu esti logat');
    }
    return next();
};
exports.isAuth = isAuth;
