"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/signup", (req, res, next) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
        return next(new Error("Provide all required details"));
    }
});
router.post("/signin", (req, res) => { });
router.post("/signout", (req, res) => { });
router.get("/currentUser", (req, res) => { });
exports.default = router;
//# sourceMappingURL=auth.js.map