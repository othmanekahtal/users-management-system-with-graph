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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const jsonwebtoken_1 = require("jsonwebtoken");
const apollo_server_express_1 = require("apollo-server-express");
const generateToken = (id) => {
    console.log(process.env.JWT_SECRET);
    return (0, jsonwebtoken_1.sign)({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d',
    });
};
function willAuthenticate(authenticated) {
    if (!authenticated) {
        throw new apollo_server_express_1.AuthenticationError('you must be logged in');
    }
}
exports.resolvers = {
    Query: {
        getUser: (_, { id }, { authenticated }) => __awaiter(void 0, void 0, void 0, function* () {
            willAuthenticate(authenticated);
            try {
                return yield user_model_1.default.findById(id);
            }
            catch (_) {
                throw new Error('Error while fetching user');
            }
            return null;
        }),
        getUsers: (_, __, { authenticated }) => __awaiter(void 0, void 0, void 0, function* () {
            willAuthenticate(authenticated);
            try {
                return yield user_model_1.default.find({});
            }
            catch (error) {
                throw new Error('Error while fetching users');
            }
            return null;
        }),
    },
    Mutation: {
        createUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(input);
            try {
                const user = yield user_model_1.default.create(input);
                return {
                    user,
                    code: 201,
                    success: true,
                    message: 'user created successfully',
                };
            }
            catch (error) {
                console.log(error);
                throw new Error(`we can't create user in this moment try again later`);
            }
        }),
        authorizeUser: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ email, password });
                if (!user) {
                    throw new Error("User doesn't exist");
                }
                const token = generateToken(user.id);
                return {
                    user,
                    token,
                };
            }
            catch (error) {
                throw new apollo_server_express_1.UserInputError(`email or password is incorrect !`);
            }
        }),
        updateUser: (_, { input }, { authenticated }) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = input, user = __rest(input, ["id"]);
            willAuthenticate(authenticated);
            try {
                const newUser = yield user_model_1.default.findByIdAndUpdate(id, user, {
                    new: true,
                });
                return {
                    user: newUser,
                    code: 200,
                    success: true,
                    message: 'user updated successfully',
                };
            }
            catch (error) {
                throw new Error("Can't update user");
            }
        }),
        deleteUser: (_, { input }, { authenticated }) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = input;
            willAuthenticate(authenticated);
            try {
                const deletedUser = yield user_model_1.default.findByIdAndDelete(id);
                if (!deletedUser)
                    return {
                        code: 400,
                        success: false,
                        message: 'user not found',
                    };
                return {
                    code: 200,
                    success: true,
                    message: 'user deleted successfully',
                };
            }
            catch (error) {
                throw new Error("Can't delete user");
            }
        }),
    },
};
//# sourceMappingURL=user.resolver.js.map