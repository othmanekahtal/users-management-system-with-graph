"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'An user must have a first name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'An user must have a last name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'An user must have an email'],
        unique: true,
        trim: true,
        validate: {
            message: 'An email is not valid !',
            validator: validator_1.default.isEmail,
        },
    },
    password: {
        type: String,
        required: [true, 'An user must have a password'],
        trim: true,
    },
});
//# sourceMappingURL=user.schema.js.map