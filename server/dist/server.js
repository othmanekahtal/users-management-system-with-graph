"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const errorException_controller_1 = __importDefault(require("./controllers/errorException.controller"));
const server = (0, express_1.default)();
// Set security HTTP headers
if (process.env.NODE_ENV == 'production') {
    server.use((0, helmet_1.default)());
}
// Limit requests from same API
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
server.use('/api', limiter);
// Body parser, reading data from body into req.body
server.use(express_1.default.json({ limit: '10kb' }));
// Data sanitization against NoSQL query injection
server.use((0, express_mongo_sanitize_1.default)());
// Data sanitization against XSS
// convert all html or malicious code to symbols
server.use((0, xss_clean_1.default)());
/*
we create a central middleware for handle all errors
 */
server.use(errorException_controller_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map