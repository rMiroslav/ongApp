var express = require('express');
var router = express.Router();

// router.post('/events');
router.get('/events', function(req, res){
    res.json({event:'working!!!!'})
});

module.exports = router;