"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-types
exports.default = (fn) => (req, res, next) => fn(req, res, next).catch(next);
//# sourceMappingURL=asyncCatch.js.map