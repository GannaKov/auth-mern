const express = require("express");
const multerUtils = require("../utils/multerUtils");
const fs = require("fs").promises;
const path = require("path");
const Image = require("../models/imageModel");

uploadRouter = express.Router();
uploadMultiRouter = express.Router();
getPiksRouter = express.Router();

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

      const newImage = new Image({
        name: filename,
        path: `images/${filename}`,
      });
      const result = await newImage.save();

      if (!result) {
        throw { status: 500, message: "Failed to create image" };
      }
      res.status(201).json({ status: "Created ", code: 201, data: result });

      //res.json({ imageUrl: `images/${filename}` });
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
      if (!req.files) {
        throw { status: 400, message: "Filews were not uploaded" };
      }

      const imagesArr = [];
      //const fileExtension = path.extname(originalname);

      for (let i = 0; i < req.files.length; i++) {
        const { path: temporaryName, filename } = req.files[i];
        const fileName = path.join(storeImage, filename);
        await fs.rename(temporaryName, fileName);
        //imagesArr.push(`images/${filename}`);
        const newImage = new Image({
          name: filename,
          path: `images/${filename}`,
        });
        const result = await newImage.save();

        imagesArr.push({ status: "Created", code: 201, data: result });
      }

      res.status(201).json({ images: imagesArr });
    } catch (err) {
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          await fs.unlink(req.files[i].path);
        }
      }
      return next(err);
    }
  }
);
//upload.array('photos', 5)

getPiksRouter.get("/", async (req, res, next) => {
  try {
    const result = await Image.find();
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = { uploadRouter, uploadMultiRouter, getPiksRouter };
