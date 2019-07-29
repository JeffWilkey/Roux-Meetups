const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const configs = require('./config');
const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');
const app = express();
const PORT = process.env.PORT || 3000;

const config = configs[app.get('env')];

// Service Instances
const speakerService = new SpeakerService(config.data.speakers);
const feedbackService = new FeedbackService(config.data.feedback);

// Template Engine and Settings
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
app.set('views', path.join(__dirname, './views'));
app.locals.title = config.sitename;

// Other middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// Handle favicon
app.get('/favicon.ico', (req, res, next) => {
  return res.sendStatus(204);
});

// Get Data
app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Routing
const router = require('./routes');
app.use('/', router({
  speakerService,
  feedbackService
}));

// Error handling
app.use((req, res, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status =  status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  return res.render('error');
});

// Start Server
app.listen(PORT, () => {
  console.log('App listening on port: ' + PORT);
});

module.exports = app;