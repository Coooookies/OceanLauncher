<script lang="ts" setup>
import { MSvgIcon } from '@/global/components/svgIcon';
const props = defineProps<{
  type: 'primary' | 'default' | 'ghost',
  title: string,
  icon?: string,
  shader?: boolean,
  arrow?: boolean,
  disabled?: boolean
}>()
</script>

<template>
  <button
    class="m-button"
    :disabled="props.disabled"
    :class="{
      'm-button-style-primary': props.type === 'primary',
      'm-button-style-default': props.type === 'default',
      'm-button-style-ghost': props.type === 'ghost',
      'm-button-shader': props.shader
    }"
  >
    <m-svg-icon
      v-if="props.icon && !props.disabled"
      :name="props.icon"
      :color="props.type === 'ghost' ? '#4B69FF' : 'white'"
      class="_icon"
    />
    <span
      class="_title"
      v-text="props.title"
    />
    <m-svg-icon
      v-if="props.arrow"
      :color="props.type === 'ghost' ? '#4B69FF' : 'white'"
      name="button-arrow"
      class="_arrow"
    />
  </button>
</template>

<style lang="scss" scoped>
.m-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 38px;
  padding: 0 14px;
  overflow: hidden;

  transition: background-color 0.1s, box-shadow 0.1s;
  cursor: pointer;

  ._icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  ._arrow {
    width: 10px;
    height: 10px;
    margin-left: 5px;
  }

  ._title {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:active {
    transition: background-color 0s, box-shadow 0s;
    ;
  }

  &,
  &.m-button-style-default {
    background-color: rgba(0, 0, 0, 0.12);

    ._title {
      color: rgba(0, 0, 0, 0.8);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &.m-button-style-primary {

    &.m-button-shader {
      box-shadow: 0 8px 32px 0 #4b69ff7c;
    }

    background-color: #4B69FF;

    ._title {
      color: white;
    }

    &:hover {
      background-color: #5975ff;
    }

    &:active {
      background-color: #3e5df5;
    }
  }

  &.m-button-style-ghost {
    background-color: transparent;
    box-shadow: inset 0 0 0 2px #4B69FF;

    ._title {
      color: #4B69FF;
      font-weight: 600;
    }

    &:hover {
      background-color: transparent;
      box-shadow: inset 0 0 0 2px rgba(66, 92, 223, 0.6);
    }

    &:active {
      background-color: transparent;
      box-shadow: inset 0 0 0 2px rgba(66, 92, 223, 0.3);
    }
  }

  &.disabled,
  &:disabled {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.1) !important;
    box-shadow: none !important;

    ._title {
      color: rgba(0, 0, 0, 0.3) !important;
    }
  }
}
</style>