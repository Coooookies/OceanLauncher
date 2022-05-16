<script lang="ts" setup>
import { MSvgIcon } from '../svgIcon';
import type { iSelectItem } from './interface'


const props = defineProps<{
  currentKey: String,
  items: Array<iSelectItem>,
}>()

const emits = defineEmits<{
  (e: "onUpdate", key: string): void
}>()

</script>

<template>
  <ul class="m-select-popup">
    <li
      v-for="item in props.items"
      @click="emits('onUpdate', item.key)"
      :class="{ 'active': item.key === props.currentKey }"
      class="m-select-popup-item"
    >
      <span
        class="_title"
        v-text="item.title"
      />
      <m-svg-icon
        class="_active"
        name="select-active"
        color="rgba(0, 0, 0, 0.75)"
        v-if="item.key === props.currentKey"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.m-select-popup {
  padding: 6px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  &-item {
    line-height: 40px;
    padding: 0 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 120px;
    transition: background-color 0.1s;
    border-radius: 3px;
    cursor: pointer;

    ._title {
      flex: 1;
      font-size: 13px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.5);
      transition: color 0.1s;
    }

    ._active {
      margin-left: 36px;
      width: 16px;
      height: 16px;
    }

    &.active,
    &:hover {
      ._title {
        color: rgba(0, 0, 0, 0.75);
      }
    }

    &.active {
      background-color: rgba(0, 0, 0, 0.09);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.11);
    }
  }
}
</style>