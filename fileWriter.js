const fetch = require('node-fetch');
const fs = require('fs');
const Api = require('./Api');

async function fetchAndWrite() {
  const api = new Api();
  const teams = await api.getTeams();
  writeData(teams, 'teams');

  let players = [];
  await Promise.all(
    teams.map(async ({ id }) => {
      const r = await api.getRoster(id);
      await Promise.all(
        r.map(async ({ person }) => {
          const player = await api.getPlayer(person.id);
          players.push(player);
        })
      );
    })
  );

  writeData(players, 'players');
}

async function writeData(jsonObject, filename) {
  const data = JSON.stringify(jsonObject);

  fs.writeFile('./assets/data/' + filename + '.json', data, (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON data is saved.');
  });
}

fetchAndWrite().then(() => {
  console.log('done!');
});
