<template>
  <div class="loading-circular">
    <div class="container">
      <svg
        class="circular"
        viewBox="25 25 50 50"
      >
        <circle
          class="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="5"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-circular {
  // --size: 40px;

  display: block;
  width: 64px;
  height: 64px;
  transition: visibility 180ms;



  .container {
    position: relative;
    width: 100%;
    height: 100%;
    transform: scale(1);
    opacity: 1;
    transition: transform 180ms, opacity 180ms;

    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
  }

  .circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
    stroke: #4B69FF;
    stroke-linecap: round;
  }

  .circular,
  .path {
    animation-play-state: running;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
}
</style>