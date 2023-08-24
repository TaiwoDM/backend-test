"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (!err.status) {
        err.status = "error";
    }
    if (!err.status) {
        err.statusCode = 500;
    }
    res.status(err.statusCode || 500).json({
        status: err.status,
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map