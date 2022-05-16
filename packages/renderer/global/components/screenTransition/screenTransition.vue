<script lang="ts" setup>
const diagonalRotateAngle = 90 - 90 * Math.asin(window.innerHeight / window.innerWidth);
const diagonalLength = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
const props = defineProps<{
  visible: boolean
}>()

</script>

<template>
  <teleport to="body">
    <transition name="_transition-visible">
      <div
        class="_transition"
        v-if="props.visible"
      >
        <div
          class="_transition-content"
          :style="[
            `--diagonal-length: ${diagonalLength}px`,
            `--diagonal-rotate-angle: ${diagonalRotateAngle}deg`,
          ]"
        >
          <div class="_inner clip" />
          <div class="_inner clip" />
          <div class="_inner clip" />
          <div class="_inner clip" />
          <div class="_inner clip" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>

._transition {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 9000;

  & &-content {
    --diagonal-length: 0px;
    --diagonal-rotate-angle: 0deg;

    position: absolute;
    width: var(--diagonal-length);
    height: var(--diagonal-length);
    top: calc(50% - var(--diagonal-length) / 2);
    left: calc(50% - var(--diagonal-length) / 2);
    transform: rotate(var(--diagonal-rotate-angle));
    display: flex;
    flex-direction: row;

    ._inner {
      flex: 1;
      background-color: white;
    }
  }
}

._transition-visible-enter-active,
._transition-visible-leave-active {
  transition: visibility 740ms;

  .clip {
    transition: transform 0.5s;
  }
}

._transition-visible-leave-active {
  .clip {
    &:nth-child(3) {
      transition-delay: 80ms;
    }

    &:nth-child(2),
    &:nth-child(4) {
      transition-delay: 160ms;
    }

    &:nth-child(3) {
      transition-delay: 240ms;
    }
  }
}

._transition-visible-enter-active {
  .clip {
    &:nth-child(3) {
      transition-delay: 240ms;
    }

    &:nth-child(2),
    &:nth-child(4) {
      transition-delay: 160ms;
    }

    &:nth-child(3) {
      transition-delay: 80ms;
    }
  }
}


._transition-visible-enter-from,
._transition-visible-leave-to {
  visibility: hidden;

  .clip {
    transform: scaleX(0);
  }
}

._transition-visible-enter-to,
._transition-visible-leave-from {
  visibility: visible;

  .clip {
    transform: scaleX(1.01);
  }
}
</style>