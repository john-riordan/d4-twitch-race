<script>  
  import Streamer from '$lib/components/Streamer.svelte';

  export let list = [];
</script>

<ol>
  {#each list as streamer, index (streamer.name)}
    <li>
      <Streamer
        rank={index}
        id={streamer.id}
        name={streamer.name}
        level={streamer.level}
        percent={streamer.percent}
        url={streamer.url}
        avatar={streamer.avatar}
        classKey={streamer.character}
        hardcore={streamer.mode === "hardcore"}
        isLive={Boolean(streamer.live)}
      />
    </li>
  {/each}
</ol>

<style lang="scss">
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