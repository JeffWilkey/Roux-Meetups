const express = require('express');
const feedbackRouter = express.Router();

module.exports = (params) => {
  feedbackRouter.get('/', (req, res, next) => {
    return res.send('Feedback');
  });

  feedbackRouter.post('/', (req, res, next) => {
    return res.send('Form sent');
  });

  return feedbackRouter;
}