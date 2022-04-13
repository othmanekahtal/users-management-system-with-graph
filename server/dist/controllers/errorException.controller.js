"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const errorDev = (error, res) => {
    console.log(error);
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
        stack: error.stack,
    });
};
const errorProd = (error, res) => error.isOperational
    ? res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    })
    : res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
exports.default = (error, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    error.statusCode || (error.statusCode = 500);
    error.status || (error.status = 'error');
    if (process.env.NODE_ENV === 'development') {
        errorDev(error, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let err = Object.assign(Object.assign({}, error), { name: error.name, message: error.message });
        // to identify errors happens in duplicate unique field code = 11000
        if (err.name === 'JsonWebTokenError') {
            err = new errorHandler_1.default({
                statusCode: 401,
                message: 'You are not authorized !',
            });
        }
        errorProd(err, res);
    }
};
//# sourceMappingURL=errorException.controller.js.map