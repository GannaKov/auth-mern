const express = require("express");
const multerUtils = require("../utils/multerUtils");
const fs = require("fs").promises;
const path = require("path");

uploadRouter = express.Router();

//const { postFiles } = require("../controllers/uploadFilesController");

const createFolderIsNotExist = multerUtils.createFolderIsNotExist;

const upload = multerUtils.upload;

const storeImage = path.join(process.cwd(), "images");
const uploadDir = path.join(process.cwd(), "uploads");

createFolderIsNotExist(storeImage);
createFolderIsNotExist(uploadDir);

uploadRouter.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw { status: 400, message: "File was not uploaded" };
      }
      //const fileExtension = path.extname(originalname);
      const { path: temporaryName, filename } = req.file;
      const fileName = path.join(storeImage, filename);
      await fs.rename(temporaryName, fileName);

      res.json({ imageUrl: `images/${filename}` });
    } catch (err) {
      if (err.status !== 400 && req.file) {
        await fs.unlink(temporaryName);
      }
      return next(err);
    }
  }
);

module.exports = uploadRouter;
