"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/api/users", auth_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(8000, () => {
    console.log("Server has started running on port 8000");
});
//# sourceMappingURL=index.js.map