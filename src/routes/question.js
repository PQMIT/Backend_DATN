const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const omitReq = require('../middlewares/omitReq');
const questionController = require('../controllers/question');

router.post(
  '/questionsInGroup',
  auth,
  asyncMiddleware(questionController.getAllQuestionByGroupQuestion),
);
router.get(
  '/questions/:id',
  auth,
  asyncMiddleware(questionController.getQuestion),
);
router.post(
  '/questions',
  auth,
  asyncMiddleware(questionController.createQuestion),
);
router.put(
  '/questions/:id',
  auth,
  omitReq,
  asyncMiddleware(questionController.updateQuestion),
);
router.delete(
  '/questions/:id',
  auth,
  asyncMiddleware(questionController.deleteQuestion),
);

module.exports = router;
