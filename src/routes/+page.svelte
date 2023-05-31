<script>
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { page } from '$app/stores';

  import Streamer from '$lib/components/Streamer.svelte';
  import { CLASSES } from '../constants';
  import { liveStreamers } from '../stores';

  export let data = {};

  let selectedClass = null;
  let selectedMode = null;

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
      if (!$page.data?.streamed) return;
      Promise.resolve($page.data?.streamed?.live).then(async (data) => {
        const json = await data?.json();
        if (json.data) liveStreamers.set(json.data);
      });
    });
</script>

<nav>
  <span class="serif">Filter</span>
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
          loading="lazy"
        />
        <span>{className} Only</span>
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
<ol>
  {#each renderedSteamers as streamer, index (streamer.name)}
    <li animate:flip={{ duration: 250 }}>
      <Streamer
        rank={index}
        id={streamer.id}
        name={streamer.name}
        level={streamer.level}
        url={streamer.url}
        avatar={streamer.avatar}
        classKey={streamer.class}
        hardcore={streamer.hardcore}
      />
    </li>
  {/each}
</ol>

<style lang="scss">
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

      &:not(:has(.check)):hover button.active > span {
        opacity: 0;
      }
    }

    > span {
      color: var(--c4);
      
    }

    button {
      --img-size: 3.5rem;
      position: relative;
      display: flex;
      align-items: center;
      height: var(--img-size);
      font-size: 1.25rem;

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

  ol {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    min-height: 20vh;

    li {
      container-type: inline-size;
      container-name: streamer;
    }
  }
</style>
