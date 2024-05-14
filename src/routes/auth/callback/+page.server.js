import { redirect, error } from '@sveltejs/kit';

import {
  PRIVATE_BNET_CLIENT_ID,
  PRIVATE_BNET_CLIENT_SECRET,
} from '$env/static/private';

const TOKEN_URL = 'https://us.battle.net/oauth/token';
const REDIRECT = 'http://localhost:5173/auth/callback';
const SCOPE = ' ';

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const auth = btoa(`${PRIVATE_BNET_CLIENT_ID}:${PRIVATE_BNET_CLIENT_SECRET}`);
  const headers = {
    authorization: `Basic ${auth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const params = new URLSearchParams();
  params.append('redirect_uri', REDIRECT);
  params.append('scope', SCOPE);
  params.append('grant_type', 'authorization_code');
  params.append('code', url.searchParams.get('code'));

  const oauthResponse = await fetch(TOKEN_URL, {
    method: 'POST',
    body: params,
    headers,
  });

  if (!oauthResponse.ok) {
    console.log(`Token request failed with "${oauthResponse.statusText}"`);
    throw error(400, oauthResponse.statusText);
  }

  const responseData = await oauthResponse.json();

  if (!responseData.access_token) {
    throw error(401);
  }

  const { access_token } = responseData;
  const authHeader = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const userProfileResponse = await fetch(
    'https://oauth.battle.net/userinfo',
    authHeader
  );
  const userProfile = await userProfileResponse.json();
  console.log('userProfile', userProfile);

  const profileParams = new URLSearchParams();
  profileParams.append('region', 'us');
  profileParams.append('namespace', 'profile-us');
  profileParams.append('namespace', 'en_US');

  throw redirect(307, '/');
}
