const express = require('express');
const feedbackRouter = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  feedbackRouter.get('/', async (req, res, next) => {
    try {
      const feedbacklist = await feedbackService.getList();
      return res.render('feedback', {
        page: 'Feedback',
        feedbacklist
      });
    } catch (err) {
      return err;
    }
    
  });

  feedbackRouter.post('/', (req, res, next) => {
    return res.send('Form sent');
  });

  return feedbackRouter;
}