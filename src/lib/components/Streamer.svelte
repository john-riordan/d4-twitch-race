<script>
  import { CLASSES } from '../../constants'

  export let name = 'Name';
  export let level = 1;
  export let url = "/";
  export let classKey = "";

  const className = CLASSES[classKey].name;
  const isLive = name === "DatModz";
</script>

<a href={url} target="_blank" class="streamer">
  <img src="/{classKey}-icon.png" alt="{className}" class="icon" width="80" height="80" />
  <div class="meta">
    <div class="level">
      <img src="/skill-node-bg-active.webp" alt="{className}" width="148" height="148" />
      <span class="serif">{level}</span>
    </div>
    <div>
      <h3 class="serif2 name">{name}</h3>
    </div>
  </div>
  {#if isLive}
    <span class="live">Live</span>
  {/if}
</a>

<style lang="scss">
  .streamer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-left: 1rem;
    padding-right: 10rem;
    text-decoration: none;

    &:hover {
      &::before {
        filter: brightness(1);
      }
      .icon {
        opacity: 1;
      }
    }

    > * {
      position: relative;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url(/banner.webp);
      background-repeat: no-repeat;
      background-position: center left;
      background-size: 800px;
      text-decoration: none;
      filter: brightness(0.75);
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .icon {
    position: absolute;
    top: 50%;
    right: 0;
    translate: 0% -50%;
    width: 8rem;
    opacity: 0.3;
  }

  .level {
    position: relative;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      font-size: 3rem;
      letter-spacing: 0;
      line-height: 1;
      padding-bottom: 0.125em;
    }
  }

  .name {
    font-size: 2.5rem;
    text-shadow: 0 3px 3px black;
    color: var(--c5);
  }

  .live {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--twitch1);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    letter-spacing: 0.125ch;
    padding: 0.125rem 0.5rem;
    border: 1px solid var(--twitch2);

    &::after {
      content: '';
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      background: red;
      border-radius: 50%;
    }
  }
</style>