import { redirect } from '@sveltejs/kit';

import {
  PRIVATE_BNET_CLIENT_ID,
  PRIVATE_BNET_CLIENT_SECRET,
} from '$env/static/private';

const AUTH_URL = 'https://oauth.battle.net/authorize';
// const REDIRECT = 'http://localhost:5173/auth/callback';
const REDIRECT = 'https://d4race.com/auth/callback';
const RESPONSE_TYPE = 'code';
const SCOPE = '';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const url = `${AUTH_URL}?client_id=${PRIVATE_BNET_CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  throw redirect(307, url);
}
