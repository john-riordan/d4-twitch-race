<script>
  import './styles.css';
</script>

<main class="app">
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
    max-width: 50rem;
    margin: 0 auto;
    padding-top: 4rem;
    z-index: 2;
  }

  footer {
    text-align: center;
    padding: 8rem 0 3rem;
    color: var(--c4);
  }
</style>