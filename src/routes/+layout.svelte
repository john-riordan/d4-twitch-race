<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import { CLASSES, MODES } from '../constants';

  import './styles.css';

  export let data = {};

  let time = null;

  $: update = (time - data.streamers.updatedAt) / 1000 / 60;

  onMount(() => {
    time = Date.now()
  })

  function minsToHrs(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = Math.round(minutes % 60);
    return hours + " hours " + remainingMinutes + " minutes";
  }
</script>

<main class="app">
  <header>
    <img src="/d4-logo-sm.webp" alt="Diablo 4" class="hero-logo" width="400" height="187" />
    <div>
      <h1 class="title">
        Diablo 4 Launch week Twitch Tracker
      </h1>
      <br />
      <!-- {#if time}
        <h2 class="updated">
          Updated: <u>{update > 60 ? minsToHrs(update) : update < 1 ? 1 : Math.floor(update)} mins ago</u>
        </h2>
      {:else}
        <h2 class="updated">...</h2>
      {/if} -->
      <h2 class="updated">🚨 No longer updating. Come back for Season 1!🚨 </h2>
      <!-- <p class="disclaimer">
        ** This is a manually updated and curated list. If your favorite streamer isn't on here I'm sorry **
      </p> -->
      <p class="disclaimer">
        🏆 Congrats <a href="https://www.twitch.tv/rob2628" target="_blank">Rob (Softcore)</a>, 
        <a href="https://www.twitch.tv/carn_" target="_blank">Carn (Hardcore)</a>, 
          and <a href="https://www.twitch.tv/wudijo" target="_blank">Wudijo (Hardcore Solo)</a> 🏆
      </p>
    </div>
  </header>
  <hr />
  <nav>
    <span class="serif">Filter</span>
    <div class="controls">
      {#each Object.keys(CLASSES).filter((c) => c !== 'all') as classKey}
        {@const className = CLASSES[classKey]}
        {@const active = $page.params?.character === classKey}
        {@const href = `/${$page.params?.mode || 'both'}/${classKey}`}
        <a
          {href}
          class="serif"
          class:active
        >
          <img
            src="/d4-classes-icon-{classKey}-base.webp"
            alt={className}
            width="80"
            height="80"
          />
          <img
            src="/d4-classes-icon-{classKey}-hover.webp"
            class="hover"
            alt={className}
            width="80"
            height="80"
            loading="lazy"
          />
          <span>{className} Only</span>
        </a>
      {/each}
    </div>
    <div class="controls">
      {#each Object.keys(MODES).filter((m) => m !== 'both') as modeKey}
        {@const modeName = MODES[modeKey]}
        {@const active = $page.params?.mode === modeKey}
        {@const href = `/${modeKey}/${$page.params?.character || 'all'}`}
        <a
          {href}
          class="check"
          class:active={active}
        >
          <span>{modeName}</span>
        </a>
      {/each}
    </div>
  </nav>
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
    aspect-ratio: 92 / 43;
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

  nav {
    container-type: inline-size;
    container-name: nav;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    @container app (max-width: 700px) {
      flex-direction: column;
      gap: 0.75rem;
    }

    .controls {
      display: flex;
      gap: 0.5rem;
      justify-content: center;

      &:not(:has(.check)):hover .active > span {
        opacity: 0;
      }
    }

    > span {
      color: var(--c4);
    }

    button,
    a {
      --img-size: 3.5rem;
      position: relative;
      display: flex;
      align-items: center;
      height: var(--img-size);
      font-size: 1.25rem;
      text-decoration: none;

      &:not(.check):hover,
      &:not(.check).active {
        > span {
          translate: -50% -150%;
          opacity: 1;
        }
      }

      &:hover,
      &.active {
        .hover {
          opacity: 1;
        }
      }
      &:not(.check):hover {
        > span {
          opacity: 1 !important;
        }
      }

      &:not(.check) > span {
        position: absolute;
        top: 0;
        left: 50%;
        white-space: nowrap;
        font-size: 0.75rem;
        translate: -50% -50%;
        opacity: 0;
        transition: all 150ms ease-out;
      }

      img {
        width: var(--img-size);
        height: var(--img-size);
        opacity: 0.75;

        @container app (max-width: 600px) {
          --img-size: 2.5rem;
        }
      }
      .hover {
        position: absolute;
        left: 0;
        opacity: 0;
      }

      &.check {
        gap: 0.25rem;
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }

        &::before {
          content: '';
          width: 44px;
          height: 44px;
          background: url('/checkbox_empty.webp') no-repeat center;
          background-size: 44px;
        }

        &.active {
          opacity: 1;

          &::before {
            background: url('/checkbox_filled.webp') no-repeat center;
            background-size: 44px;
          }
        }
      }
    }
  }

  footer {
    padding: 10rem 0 3rem;
    color: var(--c4);
    text-align: center;
  }
</style>