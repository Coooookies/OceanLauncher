<script lang="ts" setup>
import { MSvgIcon } from '@/global/components/svgIcon';

const emits = defineEmits<{
  (e: 'click'): void
}>()
const props = defineProps<{
  theme?: 'default' | 'blue',
  tooltip?: string
  icon: string
}>()
</script>

<template>
  <li
    class="m-fab-item"
    :class="{
      'theme-default': !props.theme || props.theme === 'default',
      'theme-blue': props.theme === 'blue'
    }"
    @click="emits('click')"
  >
    <m-svg-icon
      :name="props.icon"
      class="_icon"
      color="white"
    />

    <span
      class="_tooltip"
      v-if="props.tooltip"
      v-text="props.tooltip"
    />
  </li>
</template>

<style lang="scss">
.m-fab-item {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ._tooltip {
    position: absolute;
    padding: 3px 6px;
    border-radius: 4px;
    right: 100%;
    margin-right: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.8);
    font-size: 12px;
    font-weight: 600;
    transform: translateX(3px);
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.2s, opacity 0.2s, transform 0.2s;
  }

  &:hover {
    ._tooltip {
      transition-delay: 0.5s;
      transform: translateX(0px);
      visibility: visible;
      opacity: 1
    }
  }

  ._icon {
    width: 20px;
    height: 20px;
  }

  &:first-child {
    margin-bottom: 0px;
  }

  &:active {
    transition: background-color 0.1s;
  }

  &,
  &.theme-default {
    background-color: #4B69FF;

    &:hover {
      background-color: #5975ff;
    }

    &:active {
      background-color: #3758ff;
    }
  }

  &.theme-blue {
    background-color: #3290FF;

    &:hover {
      background-color: #4b9fff;
    }

    &:active {
      background-color: #268bff;
    }
  }
}
</style>