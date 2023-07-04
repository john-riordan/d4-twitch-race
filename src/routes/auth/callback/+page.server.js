import { redirect } from '@sveltejs/kit';

import {
  PRIVATE_BNET_CLIENT_ID,
  PRIVATE_BNET_CLIENT_SECRET,
} from '$env/static/private';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  console.log('CALLBACK DATA', url.searchParams);
}
