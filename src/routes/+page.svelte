<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import Streamer from '$lib/components/Streamer.svelte';
  import { CLASSES } from '../constants';
  import { liveStreamers } from '../stores';

  export let data = {};

  let selectedClass = null;
  let selectedMode = null;

  $: classesLeaderboards = (data.streamers || []).reduce((acc, curr) => {
    if (!acc[curr.class]) acc[curr.class] = [];
    acc[curr.class].push(curr);
    return acc;
  }, {});

  $: modeLeaderboards = (data.streamers || []).reduce(
    (acc, curr) => {
      if (curr.hardcore) acc.hc.push(curr);
      else acc.sc.push(curr);
      return acc;
    },
    { hc: [], sc: [] }
  );

  $: renderedSteamers = (data.streamers || [])
    .sort((a, b) => b.level - a.level)
    .map((streamer, i) => ({ ...streamer, rankOverall: i }))
    .filter((streamer) => {
      const playerClass = selectedClass ? streamer.class === selectedClass : true;
      const mode = streamer.hardcore ? 'hc' : 'sc';
      const playerMode = selectedMode ? mode === selectedMode : true;
      return playerClass && playerMode;
    });

    onMount(async () => {
      Promise.resolve($page.data?.streamed?.live).then(async (data) => {
        const json = await data.json();
        liveStreamers.set(json.data);
      });
    });

  
</script>

<nav>
  <div class="controls">
    {#each Object.keys(CLASSES) as classKey}
      {@const className = CLASSES[classKey].name}
      {@const active = selectedClass === classKey}
      <button
        class="serif"
        class:active
        title={className}
        on:mousedown={() => {
          if (selectedClass === classKey) selectedClass = null;
          else selectedClass = classKey;
        }}
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
        />
      </button>
    {/each}
  </div>
  <div class="controls">
    <button
      class="check"
      class:active={selectedMode === 'sc'}
      on:mousedown={() => {
        if (selectedMode === 'sc') selectedMode = null;
        else selectedMode = 'sc'
      }}
    >
      <span>Softcore</span>
    </button>
    <button
      class="check"
      class:active={selectedMode === 'hc'}
      on:mousedown={() => {
        if (selectedMode === 'hc') selectedMode = null;
        else selectedMode = 'hc'
      }}
    >
      <span>Hardcore</span>
    </button>
  </div>
</nav>
{#if renderedSteamers.length}
  <ol>
    {#each renderedSteamers as streamer, index (streamer.name)}
      {@const streamerMode = streamer.hardcore ? "hc" : "sc"}
      {@const rankClass = classesLeaderboards[streamer.class].findIndex(
        (s) => s.name === streamer.name
      )}
      {@const rankMode = modeLeaderboards[streamerMode].findIndex(
        (s) => s.name === streamer.name
      )}
      <li>
        <Streamer
          id={streamer.id}
          name={streamer.name}
          level={streamer.level}
          url={streamer.url}
          avatar={streamer.avatar}
          classKey={streamer.class}
          hardcore={streamer.hardcore}
          rankOverall={streamer.rankOverall}
          rankClass={rankClass}
          rankMode={rankMode}
        />
      </li>
    {/each}
  </ol>
{/if}

<style lang="scss">
  nav {
    container-type: inline-size;
    container-name: nav;
    display: flex;
    gap: 2rem;
    justify-content: center;

    @container app (max-width: 700px) {
      flex-direction: column;
      gap: 0.5rem;
    }

    .controls {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }

    button {
      --img-size: 3.5rem;
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

        &::after {
          content: '';
          width: 44px;
          height: 44px;
          background: url('/checkbox_empty.webp') no-repeat center;
          background-size: 44px;
        }

        &.active {
          opacity: 1;

          &::after {
            background: url('/checkbox_filled.webp') no-repeat center;
            background-size: 44px;
          }
        }
      }
    }
  }

  ol {
    display: grid;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      container-type: inline-size;
      container-name: streamer;
    }
  }
</style>
