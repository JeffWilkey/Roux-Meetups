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
      next(err);
    }
  });

  speakerRouter.get('/:name', (req, res, next) => {
    return res.render('speakers/detail', {
      page: req.params.name
    });
  });

  return speakerRouter
}