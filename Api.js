const NHL_API_BASE_URL = 'https://statsapi.web.nhl.com/api/v1';

export default class Api {
  async doFetch(url) {
    try {
      const response = await fetch(NHL_API_BASE_URL + url);
      return response.json();
    } catch (e) {
      throw new Error(`Fetch failed ${e}`);
    }
  }

  async getTeams() {
    const response = await this.doFetch('/teams');
    return response.teams;
  }

  async getTeam(id) {
    const response = await this.doFetch('/teams/' + id);
    return response.teams;
  }

  async getRoster(teamId) {
    const response = await this.doFetch('/teams/' + teamId + '/roster');
    return response.roster;
  }

  async getPlayer(playerId) {
    const response = await this.doFetch('/people/' + playerId);
    return response.people[0];
  }

  async getSchedule() {
    const response = await this.doFetch('/schedule');
    return response.dates.length > 0 ? response.dates[0].games : [];
  }

  async getScheduleByDate(date) {
    const response = await this.doFetch(`/schedule?date=${date}`);

    return response.dates.length ? response.dates[0].games : [];
  }

  async getLiveFeed(gamePk) {
    return await this.doFetch(`/game/${gamePk}/feed/live`);
  }

  async getPlayerStats(playerId, statType) {
    const response = await this.doFetch(`/people/${playerId}/stats?stats=${statType}`);
    if (response.stats.length) return response.stats[0].splits;

    return [];
  }
}
