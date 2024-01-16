const router = require('express').Router();
const uploadController = require('../controllers/upload');
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');

router.post(
  '/uploads/file',
  auth,
  asyncMiddleware(uploadController.uploadFileToCloudinary),
);
router.post(
  '/uploads/avatar',
  auth,
  asyncMiddleware(uploadController.uploadAvatarToCloudinary),
);

module.exports = router;
