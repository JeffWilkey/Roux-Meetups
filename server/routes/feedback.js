const express = require('express');
const feedbackRouter = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  feedbackRouter.get('/', async (req, res, next) => {
    try {
      const feedbacklist = await feedbackService.getList();
      return res.render('feedback', {
        page: 'Feedback',
        feedbacklist,
        success: req.query.success
      });
    } catch (err) {
      return err;
    }
    
  });

  feedbackRouter.post('/', async (req, res, next) => {
    try {
      const fbName = req.body.fbName.trim();
      const fbTitle = req.body.fbTitle.trim();
      const fbMessage = req.body.fbMessage.trim();
      const feedbacklist = await feedbackService.getList();
      if (!fbName || !fbTitle || !fbMessage) {
        return res.render('feedback', {
          page: 'Feedback',
          error: true,
          fbName,
          fbTitle,
          fbMessage,
          feedbacklist
        });
      }

      await feedbackService.addEntry(fbName, fbTitle, fbMessage);
      
      return res.redirect('/feedback?success=true');
    } catch (err) {
      return next(error);
    }
  });

  return feedbackRouter;
}