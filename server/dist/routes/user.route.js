"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("@controllers/user.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/get').get(user_controller_1.getAllUsers);
router.route('/get/:id').get(user_controller_1.getUser);
router.route('/create').post(user_controller_1.createUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map