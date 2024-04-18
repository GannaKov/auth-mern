const express = require("express");
const multer = require("multer");

//const upload = multer({ dest: "uploads/" });
const fs = require("fs").promises;
const path = require("path");
const uploadDir = path.join(process.cwd(), "uploads");
const storeImage = path.join(process.cwd(), "images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});
uploadRouter = express.Router();
//const { postFiles } = require("../controllers/uploadFilesController");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};
createFolderIsNotExist(uploadDir);
createFolderIsNotExist(storeImage);

uploadRouter.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  async (req, res, next) => {
    const { path: temporaryName, originalname } = req.file;
    //const fileExtension = path.extname(originalname);
    //const fileNameWithExtension = temporaryName + fileExtension;
    //const imageUrl = path.join("images", fileNameWithExtension);
    const fileName = path.join(storeImage, originalname);
    try {
      await fs.rename(temporaryName, fileName);
      //   if (err instanceof multer.MulterError) {
      //     throw { status: 400, message: "MulterError: " + err.message };
      //   } else if (err) {
      //     throw { status: 500, message: "Internal Server Error" };
      //   }

      res.json({ imageUrl: `images/${originalname}` });
    } catch (err) {
      await fs.unlink(temporaryName);
      return next(err);
    }
  }
);

module.exports = uploadRouter;
