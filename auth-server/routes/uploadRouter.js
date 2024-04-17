const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });
const path = require("path");

uploadRouter = express.Router();
const { postFiles } = require("../controllers/uploadFilesController");

uploadRouter.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  async (req, res, next) => {
    try {
      //   if (err instanceof multer.MulterError) {
      //     throw { status: 400, message: "MulterError: " + err.message };
      //   } else if (err) {
      //     throw { status: 500, message: "Internal Server Error" };
      //   }
      const { path: temporaryName, originalname } = req.file;
      const fileExtension = path.extname(originalname);
      const fileNameWithExtension = temporaryName + fileExtension;

      const imageUrl = path.join("static", fileNameWithExtension);

      console.log("path", imageUrl);
      res.json({ imageUrl });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = uploadRouter;
