import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

export function uploadImages(dest: string, options?: { resize: boolean }) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (!req.files) return next();
    req.body.images = [];
    const files = [...(req.files as Express.Multer.File[])];
    await Promise.all(
      files.map(async (file) => {
        const filename = `${uuid()}`;
        const newFilename = `${filename}.min`;

        // Original
        await sharp(file.buffer)
          .toFormat("webp")
          .toFile(`static/${dest}/${filename}.webp`);

        // Minified
        if (options?.resize) {
          await sharp(file.buffer)
            .resize(64, 64)
            .toFormat("webp")
            .toFile(`static/${dest}/${newFilename}.webp`);
        }

        req.body.images.push(`static/${dest}/${filename}.webp`);
      })
    );

    next();
  };
}
