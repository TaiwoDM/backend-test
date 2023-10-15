import express from "express";

import signup from "src/controllers/auth/signup";
import signin from "src/controllers/auth/signin";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// router.post("/signout", (req, res) => { });
// router.get("/currentUser", (req, res) => { });

export default router;
