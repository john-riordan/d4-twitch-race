<script>
  import Streamers from '$lib/components/Streamers.svelte';

  export let data = {};
</script>

<Streamers list={data.streamers} />