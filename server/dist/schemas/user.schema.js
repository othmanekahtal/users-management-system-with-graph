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
        maxlength: [40, 'An username must have less or equal then 40 characters'],
        minlength: [10, 'An username must have more or equal then 10 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'An user must have a last name'],
        trim: true,
        maxlength: [40, 'An username must have less or equal then 40 characters'],
        minlength: [10, 'An username must have more or equal then 10 characters'],
    },
    email: {
        type: String,
        required: [true, 'An user must have an email'],
        unique: true,
        trim: true,
        maxlength: [40, 'An email must have less or equal then 40 characters'],
        minlength: [10, 'An email must have more or equal then 10 characters'],
        validate: {
            message: 'An email is not valid !',
            validator: validator_1.default.isEmail,
        },
    },
});
//# sourceMappingURL=user.schema.js.map