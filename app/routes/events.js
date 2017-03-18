var express = require('express');
var router = express.Router();
var EventsCtrl = require('../controllers/eventsCtrl');

router.post('/events', EventsCtrl.createEvent);
router.get('/events', EventsCtrl.findAll);

module.exports = router;