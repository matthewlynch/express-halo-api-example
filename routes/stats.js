const express = require('express');
const router = express.Router();

const api = require('../halo-api');

/* GET stats page. */
router.post('/', function(req, res, next) {
  const gamertag = req.body.gamertag;

  Promise.all([
    api.getPlayerAppearance(gamertag),
    api.getArenaGameHistory(gamertag)
  ]).then(([appearance, gameHistory]) => {
    console.dir(appearance);
    let wins = 0;
    let ties = 0;
    let loses = 0;

    gameHistory.data.Results.forEach(game => {
      const result = game.Players[0].Result;

      if (result === 1) {
        loses++;
      }

      if (result === 2) {
        ties++;
      }

      if (result === 3) {
        wins++;
      }
    });

    res.render('stats', {
      title: `Stats for ${gamertag}`,
      appearance: appearance.data,
      wins,
      ties,
      loses
    });
  });
});

module.exports = router;
