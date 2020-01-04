const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://www.haloapi.com/',
  headers: { 'Ocp-Apim-Subscription-Key': process.env.HALO_API_KEY }
});

function getPlayerAppearance(gamertag) {
  // get the players gamertag & service tag
  return instance.get(`/profile/h5/profiles/${gamertag}/appearance`);
}

function getArenaGameHistory(gamertag) {
  return instance.get(`/stats/h5/players/${gamertag}/matches?modes=arena`);
}

module.exports = {
  getPlayerAppearance,
  getArenaGameHistory,
};
