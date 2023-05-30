<script>
  import { CLASSES } from '../../constants'

  export let name = 'Name';
  export let level = 1;
  export let url = "/";
  export let classKey = "";
  export let hardcore = false;
  export let rankOverall = 1;
  export let rankClass = 1;
  export let rankMode = 1;

  const className = CLASSES[classKey].name;
  const isLive = name === "DatModz";
  const mode = hardcore ? "Hardcore" : "Softcore";
</script>

<a href={url} target="_blank" class="streamer" class:isLive>
  <img src="/{classKey}-icon.png" alt="{className}" class="icon" width="80" height="80" />
  <div class="meta">
    <div class="level">
      <img src="/skill-node-bg-active.webp" alt="{className}" width="148" height="148" />
      <span class="serif">{level}</span>
    </div>
    <h3 class="serif2 name">{name}</h3>
  </div>
  <div class="info">
    <div class="ranks">
      <span>#{rankOverall + 1} Overall</span>
      <span>#{rankClass + 1} {className}</span>
      <span>#{rankMode + 1} {mode}</span>
    </div>
    <span class="live">Live</span>
  </div>
</a>

<style lang="scss">
  .streamer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
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
      pointer-events: none;
    }
  }

  .meta {
    position: relative;
    display: flex;
    align-items: center;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 0;
    translate: -25% -50%;
    width: 5rem;
    z-index: 1;
  }

  .level {
    position: relative;
    width: 9.25rem;
    height: 8rem;

    img,
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
    }
    img {
      width: 9.25rem;
      height: 9.25rem;
      aspect-ratio: 1;
    }

    span {
      font-size: 3rem;
      letter-spacing: 0;
      line-height: 1;
      padding-bottom: 0.125em;
    }
  }

  .name {
    font-size: 1.75rem;
    line-height: 1;
    text-shadow: 0 3px 3px black;
    color: var(--c5);
  }

  .info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    
  }
  .ranks {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    text-align: right;

    span {
      display: block;
    }
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
    opacity: 0;
    visibility: hidden;

    .isLive & {
      opacity: 1;
      visibility: visible;
    }

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