const express = require('express');
const router = express.Router();

/* GET index page. */
router.get('/ping', (req, res) => {
  res.json("pong");
});

module.exports = router;
