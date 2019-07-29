const express = require('express');
const speakerRouter = express.Router();

module.exports = (params) => {
  
  const { speakerService } = params;

  speakerRouter.get('/', async (req, res, next) => {
    try {
      const results = await Promise.all([
        speakerService.getList(),
        speakerService.getAllArtwork()
      ]);
      return res.render('speakers', {
        page: 'All Speakers',
        speakerslist: results[0],
        artwork: results[1]
      });
    } catch (err) {
      return err;
    }
  });

  speakerRouter.get('/:name', async (req, res, next) => {
    try {
      const results = await Promise.all([
        speakerService.getSpeaker(req.params.name),
        speakerService.getArtworkForSpeaker(req.params.name)
      ]);

      if (!results[0]) return next();

      return res.render('speakers/detail', {
        page: req.params.name,
        speaker: results[0],
        artwork: results[1]
      });
    } catch (err) {
      return next(err);
    }
  });

  return speakerRouter
}