// TODO: move to environment variables
//'https://nhl-service.greensea-4b620c72.westus2.azurecontainerapps.io';
const API_BASE_URL = 'http://localhost:5069';
const API_KEY_NAME = 'X-API-Key'; // must match server config
const API_KEY_VALUE = 'changeme'; // set this to your configured value

export default class Api {
    async doFetch(url) {
        try {
            const response = await fetch(API_BASE_URL + url, {
            headers: {
                [API_KEY_NAME]: API_KEY_VALUE,
            },
            });

            if (!response.ok) throw new Error('Status not ok');

            const responseJson = await response.json();
            if (responseJson.error) throw new Error(responseJson.message);

            return responseJson;
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
