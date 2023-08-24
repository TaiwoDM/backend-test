"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("src/utils/auth");
const User_1 = __importDefault(require("src/models/User"));
const router = express_1.default.Router();
router.post("/signup", async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            const err = new Error("Provide all required details");
            err.statusCode = 400;
            err.status = "failed";
            throw err;
        }
        const encryptedPassword = await (0, auth_1.hashPassword)(password);
        const newUser = await User_1.default.create({
            email,
            fullName,
            password: encryptedPassword,
        });
        return res.status(201).json({
            status: "success",
            message: "User sucessfully created",
            data: newUser,
        });
    }
    catch (error) {
        throw error;
    }
});
router.post("/signin", (req, res) => { });
router.post("/signout", (req, res) => { });
router.get("/currentUser", (req, res) => { });
exports.default = router;
//# sourceMappingURL=auth.js.map