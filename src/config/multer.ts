import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const hash = crypto.randomBytes(10).toString('hex');
      const filename = `${hash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
});
