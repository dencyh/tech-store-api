import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

export function uploadImage(dest: string) {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `static/${dest}`);
    },
    filename(req, file, cb) {
      cb(null, uuid() + ".png");
    }
  });
  return multer({ storage });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "static/");
  },
  filename(req, file, cb) {
    cb(null, uuid() + ".png");
  }
});
export const uploadMiddleware = multer({ storage });
