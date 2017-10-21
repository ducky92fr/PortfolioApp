var express = require('express');
var router = express.Router();

/* Testing */
router.get('/', function(req, res, next) {
  res.json({ test: 'Hello' });
});

module.exports = router;
