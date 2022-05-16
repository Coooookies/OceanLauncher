<script lang="ts" setup>

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
}>()

const props = defineProps<{
  top: number,
  left: number,
  visible: boolean,
  origin?: [number, number],
  vertical?: 'top' | 'bottom',
  horizontal?: 'left' | 'right',
}>()
</script>

<template>
  <teleport to="body">
    <transition name="_app-wrapper">
      <div
        class="_app-wrapper"
        @click.self="emits('update:visible', false)"
        v-if="props.visible"
      >
        <div
          class="_app-wrapper-container"
          :style="[{
            'top': `${props.top}px`,
            'left': `${props.left}px`,
            'transform-origin': Array.isArray(props.origin) ?
              `${props.origin[0]}% ${props.origin[1]}%` :
              '0% 0%',
          },
          `--vertical-position: ${props.vertical ? (props.vertical === 'top' ? 0 : -100) : 0}%`,
          `--horizontal-position: ${props.horizontal ? (props.horizontal === 'left' ? 0 : -100) : 0}%`
          ]"
        >
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
._app-wrapper-enter-to,
._app-wrapper-leave-from {
  opacity: 1;

  ._app-wrapper-container {
    transform: scale(1) translate(var(--horizontal-position), var(--vertical-position)) !important;
  }
}

._app-wrapper-enter-from,
._app-wrapper-leave-to {
  opacity: 0;

  ._app-wrapper-container {
    transform: scale(0.93) translate(var(--horizontal-position), var(--vertical-position)) !important;
  }
}

._app-wrapper-enter-active {
  --transition-time: 0.2s;

  transition: opacity var(--transition-time) cubic-bezier(.3, .18, 0, 1);

  ._app-wrapper-container {
    transition: transform var(--transition-time) cubic-bezier(.3, .18, 0, 1);
  }
}

._app-wrapper-leave-active {
  --transition-time: 0.1s;

  transition: opacity var(--transition-time);

  ._app-wrapper-container {
    transition: transform var(--transition-time);
  }
}

._app-wrapper {
  z-index: 5000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  -webkit-app-region: no-drag;

  & &-container {
    --horizontal-position: 0%;
    --vertical-position: 0%;

    position: absolute;
    overflow: hidden;
    box-shadow:
      0 4px 16px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(0, 0, 0, 0.13);
    background-color: white;
    border-radius: 7px;
    transform: translate(var(--horizontal-position), var(--vertical-position));
  }
}
</style>