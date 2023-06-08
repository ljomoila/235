// TODO: environment variables
const API_BASE_URL = 'http://localhost:8080'; //'https://statsapi.web.nhl.com/api/v1';

export default class Api {
    async doFetch(url) {
        try {
            const response = await fetch(API_BASE_URL + url);
            return response.json();
        } catch (e) {
            throw new Error(`Fetch to ${url} failed, error: ${e.message}`);
        }
    }

    async getTeams() {
        return await this.doFetch('/teams');
    }

    async getTeam(id) {
        return await this.doFetch('/teams/' + id);
    }

    async getRoster(teamId) {
        return await this.doFetch(`/teams/${teamId}/roster`);
    }

    async getPlayer(apiLink) {
        return await this.doFetch('/player/' + apiLink);
    }

    async getSchedule() {
        return await this.doFetch('/schedule');
    }

    async getLiveFeed(gamePk) {
        return await this.doFetch(`/game/${gamePk}/feed/live`);
    }

    async getGames(date) {
        return await this.doFetch(`/games/${date}`);
    }

    async getPlayerStats(playerId, statsType) {
        return await this.doFetch(`/player/${playerId}/stats/${statsType}`);
    }
}
