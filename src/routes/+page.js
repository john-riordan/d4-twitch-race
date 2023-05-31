/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch('/data/streamers.json');
  const streamers = await res.json();

  return {
    streamers,
    // streamed: {
    //   live: fetch('/api/live'),
    // },
  };
}
