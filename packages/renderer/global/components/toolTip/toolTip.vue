<script setup lang="ts">
const props = defineProps({
  title: {
    type: String
  },
  position: {
    type: String as () => 'top' | 'bottom' | 'left' | 'right',
    default: 'bottom'
  }
})
</script>

<template>
  <label
    class="__tooltip_slot"
    :tool-top="props.title"
  >
    <slot />
    <span
      class="__tooltip-tag"
      :class="`position-${props.position}`"
      v-text="props.title"
      v-if="props.title"
    />
  </label>
</template>

<style lang="scss" scoped>
.__tooltip_slot {
  position: relative;

  --tooltip_top: calc(100% + 8px);
  --tooltip_left: 50%;
  --tooltip_transitionX: -50%;
  --tooltip_transitionY: 0%;
  --tooltip_scale: 88%;

  &:hover {
    --tooltip_scale: 100%;
    transition-delay: 400ms;

    .__tooltip-tag {
      opacity: 1;
      visibility: visible;
      transition-delay: 400ms;

    }
  }

  .__tooltip-tag {
    pointer-events: none;
    position: absolute;
    padding: 6px 9px;
    border-radius: 4px;
    box-shadow: var(--popup-box-shadow);
    background-color: var(--popup-background-color);
    top: var(--tooltip_top);
    left: var(--tooltip_left);
    transform: translate(var(--tooltip_transitionX), var(--tooltip_transitionY)) scale(var(--tooltip_scale));
    color: white;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    z-index: 400;
    opacity: 0;
    visibility: hidden;
    transition: opacity 150ms, visibility 150ms, transform 150ms;

    &.position-bottom,
    &.position-default {
      --tooltip_top: calc(100% + 8px);
      --tooltip_left: 50%;
      --tooltip_transitionX: -50%;
      --tooltip_transitionY: 0%;
      transform-origin: 50% 0%;
    }

    &.position-top {
      --tooltip_top: 0%;
      --tooltip_left: 50%;
      --tooltip_transitionX: -50%;
      --tooltip_transitionY: calc(-100% - 8px);
      transform-origin: 50% 100%;
    }

    &.position-right {
      --tooltip_top: 50%;
      --tooltip_left: calc(100% + 8px);
      --tooltip_transitionX: 0%;
      --tooltip_transitionY: -50%;
      transform-origin: 0% 50%;
    }

    &.position-left {
      --tooltip_top: 50%;
      --tooltip_left: 0%;
      --tooltip_transitionX: calc(-100% - 8px);
      --tooltip_transitionY: -50%;
      transform-origin: 100% 50%;
    }
  }
}
</style>