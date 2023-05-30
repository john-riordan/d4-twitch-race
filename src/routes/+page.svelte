<script>
  import Streamer from '$lib/components/Streamer.svelte';

  import { CLASSES } from '../constants'

  export let data = {};

  let selectedClass = null;

  $: classesLeaderboards = (data.streamers || []).reduce((acc, curr) => {
    if (!acc[curr.class]) acc[curr.class] = [];
    acc[curr.class].push(curr);
    return acc;
  }, {})

  $: modeLeaderboards = (data.streamers || []).reduce((acc, curr) => {
    if (curr.hardcore) acc.hc.push(curr);
    else acc.sc.push(curr);
    return acc;
  }, { hc: [], sc: [] })

  $: renderedSteamers = (data.streamers || [])
    .sort((a, b) => b.level - a.level)
    .map((streamer, i) => ({ ...streamer, rankOverall: i }))
    .filter((streamer) => selectedClass ? streamer.class === selectedClass : streamer);
</script>


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
    {#each renderedSteamers as streamer (streamer.name)}
      {@const streamerMode = streamer.hardcore ? 'hc' : 'sc'}
      {@const rankClass = classesLeaderboards[streamer.class].findIndex((s) => s.name === streamer.name)}
      {@const rankMode = modeLeaderboards[streamerMode].findIndex((s) => s.name === streamer.name)}
      <li>
        <Streamer
          name={streamer.name}
          level={streamer.level}
          url={streamer.url}
          avatar={streamer.avatar}
          classKey={streamer.class}
          hardcore={streamer.hardcore}
          rankOverall={streamer.rankOverall}
          rankClass={rankClass}
          rankMode={rankMode}
          isLive={data.live.find((twitch) => streamer.id === twitch.user_id)}
        />
      </li>
    {/each}
  </ol>
{/if}

<style lang="scss">
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

  ol {
    display: grid;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>