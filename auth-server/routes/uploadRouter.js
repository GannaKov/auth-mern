const express = require("express");
const path = require("path");
const multer = require("multer");

//const upload = multer({ dest: "uploads/" });
const fs = require("fs").promises;

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
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpeg format allowed!"));
    }
  },
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
