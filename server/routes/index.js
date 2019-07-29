const express = require('express');
const router = express.Router();
const speakersRouter = require('./speakers');
const feedbackRouter = require('./feedback');

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const results = await Promise.all([
        speakerService.getListShort(),
        speakerService.getAllArtwork()
      ]);

      return res.render('index', {
        page: 'Home',
        speakerslist: results[0],
        artwork: results[1]
      });
    } catch (err) {
      next(err);
    }
    
  });

  router.use('/speakers', speakersRouter(params));
  router.use('/feedback', feedbackRouter(params));

  return router;
};