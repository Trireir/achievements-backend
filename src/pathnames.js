const STEAM_KEY = process.env.STEAM_KEY;

const pathnames = {
  getUserId: (username) => (`/ResolveVanityURL/v0001/?key=${STEAM_KEY}&vanityurl=${username}`),
  getUserInfo: (userids) => (
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=[${userids.join(',')}]`
  ),
}

export default pathnames;
