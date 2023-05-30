<script>
  import { onMount } from 'svelte';

  import './styles.css';

  const updatedAt = 1685416195278;

  let time = null;

  onMount(() => {
    time = Date.now();
  });

  $: update = (time - updatedAt) / 1000 / 60;

  function minsToHrs(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = Math.round(minutes % 60);
    return hours + " hours " + remainingMinutes + " minutes";
  }
</script>

<main class="app">
  <header>
    <img src="/d4-logo.webp" alt="Diablo 4" class="hero-logo" />
    <div>
      <h1 class="title">Diablo 4 Launch week Twitch Tracker</h1>
      {#if time}
        <h2 class="updated">Updated: {update > 60 ? minsToHrs(update) : update < 1 ? 1 : Math.floor(update)} mins ago</h2>
      {:else}
        <h2 class="updated">...</h2>
      {/if}
      <p class="disclaimer">** This is a manually updated and curated list. If your favorite streamer isn't on here I'm sorry **</p>
    </div>
  </header>
  <hr />
  <slot />
  <footer>
    <p>This website has no affiliation with Blizzard Entertainment or Twitch.tv</p>
    <p>Made by <a href="https://twitter.com/JohnRiordan">@johnriordan</a></p>
  </footer>  
</main>

<style>
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
  }

  header {
    display: grid;
    gap: 2rem;
    justify-content: center;
    text-align: center;
  }
  .hero-logo {
    width: 80%;
    max-width: 12rem;
    aspect-ratio: 92 / 43;
    margin: 0 auto;
  }
  .title {
    font-size: 1.5rem;
    color: var(--c4);
  }
  .updated {
    font-size: 1rem;
    padding: 0;
    color: var(--c4);
  }
  .disclaimer {
    color: var(--c4);
  }

  footer {
    padding: 15rem 0 3rem;
    color: var(--c4);
    text-align: center;
  }
</style>