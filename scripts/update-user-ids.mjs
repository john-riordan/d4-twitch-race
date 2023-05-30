import fs from "fs/promises";
import path from "path";

import streamers from "../static/data/streamers.json" assert { type: "json" };

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) throw new Error("Missing CLIENT_ID and/or CLIENT_SECRET environment variable");

(async () => {
  const oAuthResponse = await fetch("https://id.twitch.tv/oauth2/token?" + new URLSearchParams(
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    }
  ), {
    method: "POST",
  });

  const {
    access_token: accessToken,
  } = await oAuthResponse.json();

  const requestUrl = new URL("https://api.twitch.tv/helix/users");
  const searchParameters = streamers.map(streamer => new URLSearchParams({
    login: streamer.url.split("/").pop().trim(),
  }));
  requestUrl.search = searchParameters.join("&");
  const userResponse = await fetch(requestUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-ID": CLIENT_ID,
    },
  });
  const { data: userData } = await userResponse.json();
  
  for (const streamer of streamers) {
    const user = userData.find(user => user.login === streamer.url.split("/").pop().trim());
    streamer.id = user.id;
    streamer.url = `https://twitch.tv/${user.login}`;
  }

  await fs.writeFile(path.join("static", "data", "streamers.json"), JSON.stringify(streamers, null, 2) + "\n");
})();
