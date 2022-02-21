const multer = require('multer');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const uploadService = require('../services/upload');
const cloudinary = require('../utils/cloudinary');

const { DOMAIN_NAME } = process.env;

async function uploadFile(req, res, next) {
  uploadService.upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      /* eslint-disable prettier/prettier */
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          return next(new CustomError(errorCodes.LIMIT_FILE_SIZE, err.message));
        case 'LIMIT_PART_COUNT':
          return next(
            new CustomError(errorCodes.LIMIT_PART_COUNT, err.message),
          );
        case 'LIMIT_FILE_COUNT':
          return next(
            new CustomError(errorCodes.LIMIT_FILE_COUNT, err.message),
          );
        case 'LIMIT_FIELD_KEY':
          return next(new CustomError(errorCodes.LIMIT_FIELD_KEY, err.message));
        case 'LIMIT_FIELD_VALUE':
          return next(
            new CustomError(errorCodes.LIMIT_FIELD_VALUE, err.message),
          );
        case 'LIMIT_FIELD_COUNT':
          return next(
            new CustomError(errorCodes.LIMIT_FIELD_COUNT, err.message),
          );
        case 'LIMIT_UNEXPECTED_FILE':
          return next(
            new CustomError(errorCodes.LIMIT_UNEXPECTED_FILE, err.message),
          );
        default:
          return next(new CustomError(errorCodes.ERROR_UPLOAD, err.message));
        /* eslint-enable prettier/prettier */
      }
    } else if (err) {
      return next(err);
    }

    const link = `${DOMAIN_NAME}/${req.file.path.slice(7)}`;
    return res.send({ status: 1, result: { link } });
  });
}
const uploadFileToCloudinary = async (req, res) => {
  const storage = multer.diskStorage({});
  const upload = multer({ storage }).single('file');

  upload(req, res, async (err) => {
    if (err) {
      res.send({});
    } else {
      const result = await cloudinary.uploader.upload(req.file.path);
      const link = result.url;

      res.send({ status: 1, result: { link } });
    }
  });
};
module.exports = { uploadFile, uploadFileToCloudinary };
