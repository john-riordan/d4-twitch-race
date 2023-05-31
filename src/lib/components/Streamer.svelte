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
  export let isLive = false;

  const className = CLASSES[classKey].name;
  const mode = hardcore ? "Hardcore" : "Softcore";
</script>

<a href={url} target="_blank" class="streamer" class:isLive>
  <div class="meta">
    <div class="level">
      <img src="/lvl-bg.webp" alt="{className}" width="132" height="132" />
      <span class="serif2 val">{level}</span>
      <span class="serif label">Lvl</span>
    </div>
    <img src="/{classKey}-icon.png" alt="{className}" class="icon" width="80" height="80" loading="lazy" />
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
    text-decoration: none;

    @container streamer (max-width: 700px) {
      gap: 0.5rem;
      padding: 0 0.75rem;
    }
    @container streamer (max-width: 400px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
    }

    &:hover {
      &::before {
        filter: brightness(1);
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

      @container streamer (max-width: 700px) {
        background-size: 650px;
        opacity: 0.75;
      }
      @container streamer (max-width: 400px) {
        background-size: 1000px;
        background-position: 90% center;
      }
    }
  }

  .meta {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;

    @container streamer (max-width: 700px) {
      gap: 0.5rem;
    }
  }

  .icon {
    width: 5rem;
    z-index: 1;

    @container streamer (max-width: 700px) {
      width: 2.5rem;
    }
    @container streamer (max-width: 500px) {
      width: 1.75rem;
    }
  }

  .level {
    position: relative;
    width: 7rem;
    height: 7rem;

    @container streamer (max-width: 700px) {
      width: 3rem;
      height: 4rem;
    }

    img,
    .val,
    .label {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
    }
    img {
      --img-size: 9.5rem;
      width: var(--img-size);
      height: var(--img-size);
      min-width: var(--img-size);
      min-height: var(--img-size);
      aspect-ratio: 1;

      @container streamer (max-width: 700px) {
        --img-size: 6rem;
      }
      @container streamer (max-width: 500px) {
        --img-size: 5rem;
      }
    }

    .val {
      padding-top: 4px;
      padding-right: 7px;
      font-size: 3.5rem;
      letter-spacing: -7px;
      line-height: 1;
      text-shadow: 0 2px 5px black;
      translate: -50% -44%;

      @container streamer (max-width: 700px) {
        font-size: 3rem;
      }
      @container streamer (max-width: 500px) {
        font-size: 2.5rem;
      }
    }
    .label {
      top: 13%;
      left: 50%;
      translate: -50% 0%;
      font-size: 0.75rem;
      text-shadow: 0 2px 5px black;

      @container streamer (max-width: 700px) {
        top: 7%;
      }
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
      box-shadow: 0 0 0 2px var(--red2);
    }

    @container streamer (max-width: 700px) {
      --img-size: 2rem;
    }
    @container streamer (max-width: 500px) {
      --img-size: 1.5rem;
    }
  }

  .name {
    font-size: 1.5rem;
    line-height: 1;
    text-shadow: 0 3px 3px black;
    color: var(--c5);

    @container streamer (max-width: 700px) and (min-width: 401px) {
      font-size: 1.25rem;
      width: 7ch;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @container streamer (max-width: 500px) and (min-width: 401px) {
      font-size: 1rem;
      width: 6ch;
    }
    @container streamer (max-width: 400px) {
      font-size: 1.25rem;
    }
  }

  .info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    
    @container streamer (max-width: 400px) {
      padding-left: 7rem;
      translate: 0 -26%;
    }
  }
  .ranks {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    text-align: center;

    @container streamer (max-width: 700px) {
      gap: 0.25rem;
    }

    .rank {
      width: 7ch;

      /* &:not(.high) {
        opacity: 0.6;
      } */
    }
    span {
      display: block;
    }
    .val {
      font-size: 1.75rem;

      @container streamer (max-width: 700px) {
        font-size: 1.25rem;
        line-height: 1;
      }
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

    @container streamer (max-width: 700px) {
      translate: -50% 60%;
      font-size: 0.5rem;
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