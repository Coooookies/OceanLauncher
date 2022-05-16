<script lang="ts" setup>

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
}>()

const props = defineProps<{
  visible: boolean,
  disabledCancel?: boolean,
}>()

const cancelHandler = () => {
  if (props.disabledCancel) return;
  emits('update:visible', false);
}

</script>

<template>
  <teleport to="body">
    <transition name="_app-wrapper">
      <div
        class="_app-wrapper"
        @click.self="cancelHandler"
        v-if="props.visible"
      >
        <div class="_app-wrapper-container">
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
    transform: scale(1);
  }
}

._app-wrapper-enter-from,
._app-wrapper-leave-to {
  opacity: 0;

  ._app-wrapper-container {
    transform: scale(0.975);
  }
}

._app-wrapper-enter-active {
  --transition-time: 0.32s;

  transition: opacity var(--transition-time) cubic-bezier(.3, .18, 0, 1);

  ._app-wrapper-container {
    transition: transform var(--transition-time) cubic-bezier(.3, .18, 0, 1);
  }
}

._app-wrapper-leave-active {
  --transition-time: 0.12s;

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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  -webkit-app-region: no-drag;

  & &-container {
    position: absolute;
    overflow: hidden;
    box-shadow:
      0 4px 16px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(0, 0, 0, 0.13);
    background-color: white;
    border-radius: 8px;
  }
}
</style>