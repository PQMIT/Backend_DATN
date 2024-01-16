const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const groupQuestionController = require('../controllers/groupQuestion');

router.get(
  '/groupQuestions',
  auth,
  asyncMiddleware(groupQuestionController.getAllGroupQuestionByUser),
);
router.get(
  '/groupQuestions/:id',
  auth,
  asyncMiddleware(groupQuestionController.getGroupQuestion),
);
router.post(
  '/groupQuestions',
  auth,
  asyncMiddleware(groupQuestionController.createGroupQuestion),
);
router.put(
  '/groupQuestions/:id',
  auth,
  asyncMiddleware(groupQuestionController.updateGroupQuestion),
);
router.delete(
  '/groupQuestions/:id',
  auth,
  asyncMiddleware(groupQuestionController.deleteGroupQuestion),
);

module.exports = router;
