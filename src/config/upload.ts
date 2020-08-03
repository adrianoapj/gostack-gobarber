import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  tmpFolder,
  uploadsFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(20).toString('HEX');
      const spplitedFileName = file.originalname.split('.');

      const extension = spplitedFileName[spplitedFileName.length - 1];
      const fileName = `${fileHash}.${extension}`;

      return callback(null, fileName);
    },
  }),
};
