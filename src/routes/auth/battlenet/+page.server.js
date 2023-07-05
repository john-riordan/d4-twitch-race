import { redirect } from '@sveltejs/kit';

import {
  PRIVATE_BNET_CLIENT_ID,
  PRIVATE_BNET_CLIENT_SECRET,
} from '$env/static/private';

const AUTH_URL = 'https://us.battle.net/oauth/authorize';
const REDIRECT = 'http://localhost:5173/auth/callback';
const RESPONSE_TYPE = 'code';
const SCOPE = ' ';

/** @type {import('./$types').PageLoad} */
export async function load(data) {
  const uuid = data.url.searchParams.get('uuid');
  const url = `${AUTH_URL}?client_id=${PRIVATE_BNET_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT}&response_type=${RESPONSE_TYPE}&state=${uuid}`;

  throw redirect(307, url);
}

// https://oauth.battle.net/authorize?client_id=a6b22920cb624777848e2e5c8f91652b&scope=&redirect_uri=https://d4armory.io/login&response_type=code
