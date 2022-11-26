import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import path from "path";

// TODO Add wrapper to pass parametrs later in routes

export function resizeImage(dest: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (!req.files) return next();
    req.body.images = [];
    const files = [...(req.files as Express.Multer.File[])];
    console.log(files);
    await Promise.all(
      files.map(async (file) => {
        const filename = `${uuid()}`;
        const newFilename = `${filename}.min`;

        // Original
        await sharp(file.buffer)
          .toFormat("png")
          .toFile(`static/${dest}/${filename}.png`);

        // Minified
        await sharp(file.buffer)
          .resize(64, 64)
          .toFormat("png")
          .toFile(`static/${dest}/${newFilename}.png`);

        req.body.images.push(newFilename);
      })
    );

    next();
  };
}
