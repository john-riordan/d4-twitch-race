<script>
  import { onMount } from 'svelte';

  import Streamer from '$lib/components/Streamer.svelte';

  import { CLASSES } from '../constants'

  export let data = {};

  const updatedAt = 1685337930037;

  let time = null;
  let selectedClass = null;

  onMount(() => {
    time = Date.now();
  });

  $: update = (time - updatedAt) / 1000 / 60;
  $: renderedSteamers = (data.streamers || []).filter((streamer) => {
      return selectedClass ? streamer.class === selectedClass : streamer;
    })
    .sort((a, b) => b.level - a.level);

  function minsToHrs(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = Math.round(minutes % 60);
    return hours + " hours " + remainingMinutes + " minutes";
  }
</script>

<header>
  <img src="/d4-logo.webp" alt="Diablo 4" class="hero-logo" />
  <div>
    <h1 class="title">Diablo 4 Launch week Twitch Tracker</h1>
    {#if time}
      <h2 class="updated">Updated: {update > 60 ? minsToHrs(update) : update} mins ago</h2>
    {:else}
      <h2 class="updated">...</h2>
    {/if}
  </div>
</header>
<hr />
<nav >
  {#each Object.keys(CLASSES) as classKey}
    {@const className = CLASSES[classKey].name}
    {@const active = selectedClass === classKey}
    <button
      class="serif"
      class:active
      title="{className}"
      on:click={() => {
        if (selectedClass) selectedClass = null
        else selectedClass = classKey
      }}
    >
      <img src="/d4-classes-icon-{classKey}-base.webp" alt="{className}" width="80" height="80" />
      <img src="/d4-classes-icon-{classKey}-hover.webp" class="hover" alt="{className}" width="80" height="80" />
    </button>
  {/each}
</nav>
{#if renderedSteamers.length}
  <ol>
    {#each renderedSteamers as streamer}
      <li>
        <Streamer name={streamer.name} level={streamer.level} url={streamer.url} classKey={streamer.class} />
      </li>
    {/each}
  </ol>
{/if}

<style lang="scss">
  header {
    display: grid;
    gap: 2rem;
    justify-content: center;
  }
  .hero-logo {
    width: 80%;
    max-width: 22rem;
    aspect-ratio: 92 / 43;
    margin: 0 auto;
  }
  .title {
    text-align: center;
    font-size: 1.5rem;
    color: var(--c4);
  }
  nav {
    display: flex;
    gap: 2rem;
    justify-content: center;

    button {
      --img-size: 4rem;
      position: relative;
      display: flex;
      align-items: center;
      height: var(--img-size);
      font-size: 1.25rem;

      &:hover,
      &.active {
        .hover {
          opacity: 1;
        }
      }

      img {
        width: var(--img-size);
        height: var(--img-size);
      }
      .hover {
        position: absolute;
        left: 0;
        opacity: 0;
      }
    }
  }

  .updated {
    font-size: 1rem;
    padding: 0;
    text-align: center;
    color: var(--c4);
  }

  ol {
    display: grid;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>