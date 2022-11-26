import { NextFunction } from "express";
import { Request, ParamsDictionary, Response } from "express-serve-static-core";
import multer from "multer";
import { ParsedQs } from "qs";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype.startsWith("image/png") ||
    file.mimetype.startsWith("image/jpg") ||
    file.mimetype.startsWith("image/jpeg")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid image type. Only png, jpg, jpeg supported"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("image", 10);

export const bufferImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};
