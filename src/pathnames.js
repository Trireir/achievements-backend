const STEAM_KEY = process.env.STEAM_KEY;

const pathnames = {
  getUserId: (username) => (`/ResolveVanityURL/v0001/?key=${STEAM_KEY}&vanityurl=${username}`)
}

export default pathnames;
