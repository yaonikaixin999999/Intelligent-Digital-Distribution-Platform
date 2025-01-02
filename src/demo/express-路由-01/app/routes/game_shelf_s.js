// routes/all_game.js
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {

        res.render('game_shelf_s', {});
    });

module.exports = router;