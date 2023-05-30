<script>
  import { CLASSES } from '../../constants'

  export let name = 'Name';
  export let level = 1;
  export let url = "/";
  export let avatar = "";
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
      <img src="/skill-node-bg-active.webp" alt="{className}" width="132" height="132" />
      <span class="serif2">{level}</span>
    </div>
    <div class="avatar-container">
      <div class="avatar">
        <img src="{avatar}" alt="{name}" width="60" height="60" />
      </div>
      <span class="live">Live</span>
    </div>
    <h3 class="serif2 name">{name}</h3>
  </div>
  <div class="info">
    <div class="ranks">
      <div class="rank" class:high={rankOverall + 1 <= 3}>
        <span class="val">#{rankOverall + 1}</span> <span class="label">Overall</span>
      </div>
      <div class="rank" class:high={rankMode + 1 <= 3}>
        <span class="val">#{rankMode + 1}</span> <span class="label">{mode}</span>
      </div>
      <div class="rank" class:high={rankClass + 1 <= 3}>
        <span class="val">#{rankClass + 1}</span> <span class="label">{className}</span>
      </div>
    </div>
  </div>
</a>

<style lang="scss">
  .streamer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-left: 4rem;
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
    gap: 1rem;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 0;
    translate: 13% -50%;
    width: 4rem;
    z-index: 1;
  }

  .level {
    position: relative;
    width: 7rem;
    height: 7rem;

    img,
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
    }
    img {
      --img-size: 8.5rem;
      width: var(--img-size);
      height: var(--img-size);
      min-width: var(--img-size);
      min-height: var(--img-size);
      aspect-ratio: 1;
    }

    span {
      padding-top: 4px;
      padding-right: 7px;
      font-size: 3.5rem;
      letter-spacing: -7px;
      line-height: 1;
    }
  }

  .avatar-container {
    position: relative;
  }
  .avatar {
    --img-size: 3rem;
    position: relative;
    width: var(--img-size);
    height: var(--img-size);
    background: var(--c1);
    border-radius: 50%;
    overflow: hidden;

    .isLive & {
      translate: 0 -10%;
    }
  }

  .name {
    font-size: 1.5rem;
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
    text-align: center;

    .rank {
      width: 7ch;

      &:not(.high) {
        opacity: 0.6;
      }
    }
    span {
      display: block;
    }
    .val {
      font-size: 1.75rem;
    }
    .label {
      color: var(--c4);
      font-size: 0.875rem;
    }
  }

  .live {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    bottom: 0;
    left: 50%;
    translate: -50% 20%;
    padding: 0 0.25rem;
    background: var(--red1);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    font-size: 0.75rem;
    letter-spacing: 0.125ch;
    border: 1px solid var(--red2);
    opacity: 0;
    visibility: hidden;

    .isLive & {
      opacity: 1;
      visibility: visible;
    }

    /* &::after {
      content: '';
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      background: #ff0053;
      border-radius: 50%;
    } */
  }
</style>