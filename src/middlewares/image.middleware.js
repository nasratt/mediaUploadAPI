const path = require('path');

const util = require('util');
const multer = require('multer');
const maxSize = 5 * 1024 * 1024;

const fileFilter = (req, file, next) => {
  const ext = path.extname(file.originalname);
  const regex = new RegExp(/\.jpg|jpeg|png/i);

  if (!regex.test(ext)) {
    const multerErr = new multer.MulterError('LIMIT_UNEXPECTED_FILE');
    multerErr.message = 'Only jpg, jpeg, and png files are allowed';
    return next(multerErr, false);
  }
  return next(null, true);
};

let processFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
  fileFilter
}).array('imgs');

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
