import { Request } from "express";
import multer, { DiskStorageOptions } from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

export function uploadImage(dest: string) {
  const storage = multer.diskStorage({
    destination(
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) {
      cb(null, `static/${dest}`);
    },
    filename(req, file, cb) {
      cb(null, uuid() + ".png");
    }
  });
  return multer({ storage });
}
