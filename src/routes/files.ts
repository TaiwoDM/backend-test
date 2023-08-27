import express from "express";

import { upload } from "src/middlewares/file";
import { protect } from "src/middlewares/auth";
import uploadFile from "src/controllers/file/upload";
import downloadFile from "src/controllers/file/downloadFile";
import createDir from "src/controllers/file/createDir";
import unsafe from "@App/controllers/file/unsafe";
// import signin from "src/controllers/auth/signin";
// import { requireSignin } from "src/middlewares/auth";

const router = express.Router();



router.post("/upload", protect, upload.single("file"), uploadFile);
router.get("/download/:id", protect, downloadFile);
router.post("/create-dir", protect, createDir)
router.post("/unsafe/:id", protect, unsafe)
// router.post("/delete/:id", protect, deleteFile);


export default router;