<script lang="ts" setup>
import { MSvgIcon } from '@/global/components/svgIcon';
import { reactive } from 'vue';
import { iWindowControlEvent } from './interface'

const emits = defineEmits<{
  (e: 'onClick', key: iWindowControlEvent): void,
}>();

const windowEvent = window.windowEvent;
const windowState = reactive({
  isActive: true
});

windowEvent.on('blur', () => {
  windowState.isActive = false;
});

windowEvent.on('focus', () => {
  windowState.isActive = true;
});


</script>

<template>
  <div
    class="control-box"
    :class="{ 'blur': !windowState.isActive }"
  >
    <button
      class="control-box-block"
      @click="windowEvent.minimize()"
    >
      <m-svg-icon
        name="window-minimise"
        class="icon"
        color="rgba(0, 0, 0, 0.7)"
      />
    </button>
    <button
      class="control-box-block"
      @click="emits('onClick', 'setting')"
    >
      <m-svg-icon
        name="window-setting"
        class="icon"
        color="rgba(0, 0, 0, 0.7)"
      />
    </button>
    <button
      class="control-box-block close-btn"
      @click="windowEvent.close()"
    >
      <m-svg-icon
        name="window-close"
        class="icon"
        color="rgba(0, 0, 0, 0.7)"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.control-box {
  display: flex;
  flex-direction: row;
  height: 100%;
  margin: 0 10px;
  align-items: center;

  &.blur {
    opacity: 0.7;
  }

  & &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin-right: 8px;
    border-radius: 4px;

    &:last-child {
      margin-right: 0px;
    }

    .icon {
      width: 14px;
      height: 14px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.07);
    }

    // &:active {
    //   background-color: rgba(255, 255, 255, 0.03);
    // }

    &.close-btn:hover {
      background-color: rgb(207, 63, 78);
    }

    // &.close-btn:active {
    //   background-color: rgba(210, 17, 35, 0.6);
    // }
  }
}
</style>
