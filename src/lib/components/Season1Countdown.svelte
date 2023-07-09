<script>
  import { SEASON_1_START } from '$lib/constants';

  var targetDate = SEASON_1_START.getTime();

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Update the countdown every second
  let countdownInterval = setInterval(function() {
    // Get the current date and time
    let currentDate = new Date().getTime();

    // Calculate the remaining time in milliseconds
    let remainingTime = targetDate - currentDate;

    // Calculate the days, hours, minutes, and seconds
    days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Display the countdown timer

    // Check if the countdown has finished
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      console.log('Countdown has ended!');
    }
  }, 1000); // Update every second (1000 milliseconds)
</script>

<div class="container">
  <img
    class="hero"
    src="/d4-season-1-emblem-logo-enus-2.webp"
    width="672"
    height="687"
    alt="Diablo 4 - Season of the Malignant"
  />
  <h3 class="timer">
    <span class="block">
      <span class="number">{days}</span>
      <span class="word">Days</span>
    </span>
    <span class="block">
      <span class="number">{hours}</span>
      <span class="word">Hours</span>
    </span>
    <span class="block">
      <span class="number">{minutes}</span>
      <span class="word">Minutes</span>
    </span>
    <span class="block">
      <span class="number">{seconds}</span>
      <span class="word">Seconds</span>
    </span>
  </h3>
</div>

<style lang="scss">
  .container {
    position: relative;
    translate: 0 -25%;
  }
  .hero {
    margin-inline: auto;
    pointer-events: none;
  }
  .timer {
    display: flex;
    justify-content: center;
    gap: 1ch;
    width: 100%;
    font-size: 4rem;
    letter-spacing: 0;
    text-align: center;
  }
  .block {
    width: 2ch;

    span {
      display: block;
    }
    .number {
      color: #ef090d;

      @supports (-webkit-background-clip: text) {
        color: #ef090d;
        background: linear-gradient(#980b0b, #ea0e04);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .word {
      color: var(--c4);
      font-size: 1rem;
      font-family: 'Alegreya Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  }
</style>
