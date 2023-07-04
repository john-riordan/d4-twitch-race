<script>
  import { CLASSES, GAME_ID } from '../../constants';

  export let rank = 0;
  export let id = 0;
  export let name = 'Name';
  export let level = 1;
  export let percent = 0;
  export let url = "/";
  export let avatar = "";
  export let classKey = "";
  export let hardcore = false;
  export let liveStreamers = [];

  $: isLive = (liveStreamers || []).find((twitch) => id === twitch.user_id && twitch.game_id === GAME_ID) ? true : false;

  const className = CLASSES[classKey].name;
  const displayedRank = rank + 1;
</script>

<a href={url} target="_blank" class="streamer" class:isLive class:hardcore>
  <div class="meta">
    <div class="level">
      <img src="/lvl-bg.webp" alt="{className}" width="132" height="132" />
      <span class="serif2 val">{level}</span>
      <span class="serif label">Lvl</span>
      {#if percent}
        <span class="percent" style="--fill: {percent}" />
      {/if}
    </div>
    <img
      src="/{classKey}-icon.png"
      alt="{className}" class="icon"
      title={className}
      width="80"
      height="80"
      loading="lazy"
    />
    <div class="avatar-container">
      <div class="avatar">
        <img src="{avatar}" alt="{name}" width="60" height="60" />
      </div>
    </div>
    <h3 class="serif2 name">{name}</h3>
    <div class="skull">💀</div>
    <span class="live">Live</span>
  </div>
  <div class="info">
    <div class="rank serif">
      <span>Rank</span>
      <span class="val">{displayedRank}</span>
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
    padding: 0 1rem;
    text-decoration: none;

    @container streamer (max-width: 700px) {
      gap: 0.5rem;
      padding: 0 0.75rem;
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
      opacity: 0.75;
      transition: all 250ms ease-out;

      @container streamer (max-width: 700px) {
        background-size: 560px;
      }
      @container streamer (max-width: 400px) {
        background-size: 400px;
      }
    }
  }

  .meta {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;

    @container streamer (min-width: 880px) {
      gap: 2rem;
    }
    @container streamer (max-width: 700px) {
      gap: 0.5rem;
    }
    @container streamer (max-width: 400px) {
      flex: 1;
      justify-content: space-between;
    }
  }

  .icon {
    width: 4rem;
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
        font-size: 2rem;
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
    .percent {
      --height: 4px;
      position: absolute;
      bottom: 1.25rem;
      left: 50%;
      width: 65%;
      height: var(--height);
      background: var(--red1);
      translate: -50% -50%;
      box-shadow: 0 0 10px 1px var(--c1);

      &::before {
        content: '';
        display: block;
        height: var(--height);
        width: calc(var(--fill) * 1%);
        background: linear-gradient(to right, var(--red2) 50%, #cc3109);
      }

      @container streamer (max-width: 700px) {
        --height: 2px;
        bottom: 0.5rem;
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
    width: 13ch;
    overflow: hidden;
    text-overflow: ellipsis;

    @container streamer (min-width: 880px) {
      font-size: 1.75rem;
      width: 12ch;
    }
    @container streamer (max-width: 700px) and (min-width: 401px) {
      font-size: 1.25rem;
    }
    @container streamer (max-width: 500px) {
      font-size: 1rem;
      width: 8ch;
    }
  }

  .info {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @container streamer (max-width: 400px) {
      display: none;
    }
  }

  .rank {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.75rem;
    color: var(--c4);

    .val {
      font-size: 1.75rem;
      width: 2ch;
      text-align: center;
    }

    @container streamer (max-width: 600px) {
      font-size: 0.75rem;

      .val {
        font-size: 1.5rem ;
      }
    }
  }

  .live {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0rem 0.25rem;
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
  }

  .skull {
    font-size: 1.5rem;
    opacity: 0;
    visibility: hidden;

    .hardcore & {
      opacity: 1;
      visibility: visible;
    }
  }
</style>