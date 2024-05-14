<script>
  import { onMount } from 'svelte';

  import './styles.css';

  export let data = {};

  let time = null;
  let uuid = null;

  $: update = (time - data.streamers.updatedAt) / 1000 / 60;

  onMount(() => {
    uuid = crypto.randomUUID();
    time = Date.now();
  })

  function minsToHrs(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = Math.round(minutes % 60);
    return hours + " hours " + remainingMinutes + " minutes";
  }

</script>

<main class="app">

  <a href="/auth/battlenet?uuid={uuid}">BattleNet OAuth</a>


  <header>
    <img
      class="hero-logo"
      src="/d4-season-2-emblem-logo-enus-2.webp"
      width="672"
      height="687"
      alt="Diablo 4 - Season of the Malignant"
    />
    <!-- <img src="/d4-logo-sm.webp" alt="Diablo 4" class="hero-logo" width="400" height="187" /> -->
    <div>
      <h1 class="title">
        Diablo 4 Season 2 Twitch Tracker
      </h1>
      <span class="description">Diablo 4 level 100 race leaderboard for Hardcore and Softcore</span>
      <br />
      {#if time}
        <h2 class="updated">
          Updated: <u>{update > 60 ? minsToHrs(update) : update < 1 ? 1 : Math.floor(update)} mins ago</u>
        </h2>
      {:else}
        <h2 class="updated">...</h2>
      {/if}
      <!-- <h2 class="updated">🚨 No longer updating. Come back for Season 1!🚨 </h2> -->
      <p class="disclaimer">
        ** This is a manually updated and curated list. If your favorite streamer isn't on here I'm sorry **
      </p>
      <!-- <p class="disclaimer">
        🏆 Congrats <a href="https://www.twitch.tv/rob2628" target="_blank">Rob (Softcore)</a>, 
        <a href="https://www.twitch.tv/carn_" target="_blank">Carn (Hardcore)</a>, 
          and <a href="https://www.twitch.tv/wudijo" target="_blank">Wudijo (Hardcore Solo)</a> 🏆
      </p> -->
    </div>
  </header>
  <hr />
  <slot />
  <footer>
    <p>This website has no affiliation with Blizzard Entertainment or Twitch.tv</p>
    <p>Made by <a href="https://twitter.com/JohnRiordan">@johnriordan</a></p>
  </footer>  
</main>

<style lang="scss">
  .app {
    container-type: inline-size;
    container-name: app;
    position: relative;
    display: grid;
    gap: 2rem;
    width: 95vw;
    max-width: 55rem;
    margin: 0 auto;
    padding-top: 2rem;
    z-index: 2;

    @media (max-width: 600px) {
      gap: 1rem;
    }
  }

  header {
    display: grid;
    gap: 2rem;
    justify-content: center;
    text-align: center;

    @container app (max-width: 600px) {
      gap: 1rem;
    }
  }
  .hero-logo {
    width: 80%;
    max-width: 13rem;
    /* aspect-ratio: 92 / 43; */
    margin: 0 auto;

    @container app (max-width: 600px) {
      max-width: 5rem;
    }
  }
  .title {
    font-size: 1.5rem;
    color: var(--c4);

    @container app (max-width: 600px) {
      font-size: 0.875rem;
    }
  }
  .description {
    display: block;
    color: var(--c4);
    margin: 0.25rem 0;
    line-height: 2;

    @container app (max-width: 600px) {
      font-size: 0.875rem;
    }
  }
  .updated {
    font-size: 1rem;
    padding: 0;
    color: var(--c4);

    @container app (max-width: 600px) {
      font-size: 0.875rem;
    }
  }
  .disclaimer {
    color: var(--c4);
    margin: 0.5rem 0;
    line-height: 1.25;

    @container app (max-width: 600px) {
      font-size: 0.875rem;
    }

    a {
      color: var(--red2);
    }
  }

  footer {
    padding: 10rem 0 3rem;
    color: var(--c4);
    text-align: center;
  }
</style>