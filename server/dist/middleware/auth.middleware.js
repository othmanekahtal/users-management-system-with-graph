"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth = (token) => {
    const secret = process.env.JWT_SECRET;
    try {
        if (token) {
            return (0, jsonwebtoken_1.verify)(token.replace('Bearer ', ''), secret);
        }
    }
    catch (error) {
        console.log(error);
        throw new Error("Can't authenticate user");
    }
    return null;
};
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map