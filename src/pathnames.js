const STEAM_KEY = process.env.STEAM_KEY;

const pathnames = {
  getUserId: (username) => (`/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_KEY}&vanityurl=${username}`),
  getUserInfo: (userids) => (
    `/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=[${userids.join(',')}]`
  ),
  getFriendsIds: (userid) => (`/ISteamUser/GetFriendList/v0001/?key=${STEAM_KEY}&steamid=${userid}&relationship=friend`),
  getUserGames: (userid) => (`/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_KEY}&steamid=${userid}&format=json&include_appinfo=1`),
  getGameInfo: (gameid) => (`/ISteamUserStats/GetSchemaForGame/v2/?key=${STEAM_KEY}&appid=${gameid}`)
}

export default pathnames;
