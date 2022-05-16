<script setup lang="ts"></script>

<template>
  <div class="loading-solid" />
</template>

<style lang="scss" scoped>
.loading-solid {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 200;

  width: 100%;
  height: 2px;
  background-color: var(--main-color);
  transform: translateX(-100%);
  animation-delay: 0.8s;
  animation: loader-solid-animation 1s ease-in-out infinite;
}

@-webkit-keyframes loader-solid-animation {
  0% {
    transform: translateX(-100%);
  }
  40% {
    transform: translateX(0);
  }
  60% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>