import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const directory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory,
  storage: multer.diskStorage({
    destination: directory,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(20).toString('HEX');
      const spplitedFileName = file.originalname.split('.');

      const extension = spplitedFileName[spplitedFileName.length - 1];
      const fileName = `${fileHash}.${extension}`;

      return callback(null, fileName);
    },
  }),
};
