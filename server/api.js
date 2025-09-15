const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minions_api');
const ideasRouter = require('./ideas_api');
const meetingRouter = require('./meeting_api');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingRouter);

module.exports = apiRouter;