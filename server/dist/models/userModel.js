"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = mongoose_1.default.model('user', user_schema_1.default);
//# sourceMappingURL=userModel.js.map