const express = require("express");
const multerUtils = require("../utils/multerUtils");
const fs = require("fs").promises;
const path = require("path");

uploadRouter = express.Router();
uploadMultiRouter = express.Router();
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
      console.log(req.file);
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

uploadMultiRouter.post(
  "/",
  upload.array("cat_pics", 3),
  async (req, res, next) => {
    try {
      console.log(req.files);
      if (!req.files) {
        throw { status: 400, message: "Filews were not uploaded" };
      }

      const imagesArr = [];
      //const fileExtension = path.extname(originalname);
      for (let i = 0; i < req.files.length; i++) {
        const { path: temporaryName, filename } = req.files[i];
        const fileName = path.join(storeImage, filename);
        await fs.rename(temporaryName, fileName);
        imagesArr.push(`images/${filename}`);
      }

      console.log("array", imagesArr);

      res.json({ imagesUrl: imagesArr });
    } catch (err) {
      if (err.status !== 400 && req.file) {
        await fs.unlink(temporaryName);
      }
      return next(err);
    }
  }
);
//upload.array('photos', 5)

module.exports = { uploadRouter, uploadMultiRouter };
