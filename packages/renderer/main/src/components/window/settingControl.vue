<script lang="ts" setup>
import { MSvgIcon } from '@/global/components/svgIcon';
import { iWindowControlEvent } from './interface'

const emits = defineEmits<{
  (e: 'onClick', key: iWindowControlEvent): void,
}>();

</script>

<template>
  <div class="control-box">
    <button
      class="control-box-block"
      @click="emits('onClick', 'closeSetting')"
    >
      <span
        class="tip"
        v-text="$t('setting.exit')"
      />
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

  & &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 0 9px 0 4px;
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

    .tip {
      margin-right: 10px;
      color: rgba(0, 0, 0, 0.7);
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      line-height: 16px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.07);

      .tip {
        background-color: #EAEAEA;
      }
    }
  }
}
</style>
