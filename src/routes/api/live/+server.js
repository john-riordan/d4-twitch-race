import { json } from '@sveltejs/kit';

import { PRIVATE_CLIENT_ID, PRIVATE_CLIENT_SECRET } from '$env/static/private';

import { performOCR } from '../../../ocr';

export async function GET({ fetch }) {
  const res = await fetch('/data/streamers.json');
  const streamers = await res.json();

  const oAuthResponse = await fetch(
    'https://id.twitch.tv/oauth2/token?' +
      new URLSearchParams({
        client_id: PRIVATE_CLIENT_ID,
        client_secret: PRIVATE_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    {
      method: 'POST',
    }
  );

  const { access_token: accessToken } = await oAuthResponse.json();

  const requestUrl = new URL('https://api.twitch.tv/helix/streams');
  const searchParameters = (streamers?.list || []).map(
    (streamer) =>
      new URLSearchParams({
        user_id: streamer.id,
      })
  );
  requestUrl.search = searchParameters.join('&');
  const streamsResponse = await fetch(requestUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Client-ID': PRIVATE_CLIENT_ID,
    },
  });
  const { data: streamsLive } = await streamsResponse.json();

  const live = streamsLive.filter((streamer) => streamer?.type === 'live');

  const imagePath =
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_datmodz-1920x1080.jpg';
  const region = { left: 738, top: 919, width: 62, height: 62 };
  performOCR(imagePath, region);

  return json({ list: live });
}
