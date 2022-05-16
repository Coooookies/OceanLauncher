<script lang="ts" setup>
const props = defineProps<{
  visible: boolean
}>()
</script>

<template>
  <teleport to="body">
    <transition name="m-fab">
      <ul
        class="m-fab"
        v-if="props.visible"
      >
        <slot />
      </ul>
    </transition>
  </teleport>
</template>

<style lang="scss">
.m-fab-leave-from {
  opacity: 1;
}

.m-fab-leave-to {
  opacity: 0;
}

.m-fab-leave-active {
  transition: opacity 0.2s;
}

.m-fab {
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  bottom: 0;
  right: 0;
  z-index: 5100;
  margin: 0 20px 20px 0;
  list-style: none;

  .m-fab-item {
    opacity: 0;
    animation: fab-item-visible 0.2s forwards;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.04s;
    }

    &:nth-child(3) {
      animation-delay: 0.08s;
    }

    &:nth-child(4) {
      animation-delay: 0.12s;
    }

    &:nth-child(5) {
      animation-delay: 0.16s;
    }
  }
}

@keyframes fab-item-visible {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>