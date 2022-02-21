const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const omitReq = require('../middlewares/omitReq');
const contestController = require('../controllers/contest');
const { checkPassword } = require('../middlewares/contest');

router.get('/contests', asyncMiddleware(contestController.getAllContest));
router.get(
  '/contests/:contestId/role/:userId',
  asyncMiddleware(contestController.checkAccountRole),
);
router.get(
  '/contests/joined',
  auth,
  asyncMiddleware(contestController.getAllContestJoined),
);
router.get(
  '/contests/createByUser',
  auth,
  asyncMiddleware(contestController.getAllContestByUser),
);
router.get(
  '/contests/:id',
  auth,
  asyncMiddleware(contestController.getContest),
);
router.post(
  '/contests',
  auth,
  asyncMiddleware(contestController.createContest),
);
router.put(
  '/contests/:id',
  auth,
  omitReq,
  asyncMiddleware(contestController.updateContest),
);
router.delete(
  '/contests/:id',
  auth,
  asyncMiddleware(contestController.deleteContest),
);
router.post(
  '/contests/:id/verifyPassword',
  auth,
  asyncMiddleware(contestController.verifyPassword),
);
router.get(
  '/contests/:id/getAllQuestion',
  auth,
  checkPassword,
  asyncMiddleware(contestController.getAllQuestion),
);
router.post(
  '/contests/:id/mark',
  auth,
  asyncMiddleware(contestController.mark),
);
router.get(
  '/contests/:id/results',
  auth,
  asyncMiddleware(contestController.getAllResultByContest),
);
router.get(
  '/contests/:id/results/user',
  auth,
  asyncMiddleware(contestController.getAllResultByUserInContest),
);

module.exports = router;
