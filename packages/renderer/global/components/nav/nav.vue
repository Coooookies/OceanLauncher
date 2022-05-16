<script lang="ts" setup>
import { iMNavItem } from './interface'

const emits = defineEmits<{
  (e: 'onUpdate', id: number): void,
  (e: 'update:currentId', id: number): void
}>();
const props = defineProps<{
  currentId: number,
  items: iMNavItem[]
}>()

const updateHandler = (id: number) => {
  if (id === props.currentId) return;

  emits('onUpdate', id);
  emits('update:currentId', id)
}
</script>

<template>
  <ul class="m-nav">
    <li
      v-for="item in props.items"
      :class="{ 'active': props.currentId === item.id }"
      class="m-nav-item"
      @click="updateHandler(item.id)"
    >
      <span v-text="item.title" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.m-nav {
  display: flex;
  flex-direction: column;
  list-style: none;

  & &-item {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 34px;
    cursor: pointer;

    transition: padding-left 0.45s;

    span {
      font-size: 13px;
      font-weight: 500;
      color: black;
      opacity: 0.7;
      transition: opacity 0.3s;
    }

    &::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 16px;
      background-color: #4B69FF;
      transform: scaleY(0);
      transform-origin: center 100%;
      border-radius: 100px;
      left: 0;
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
    }

    &:hover,
    &.active {
      span {
        opacity: 0.85;
      }
    }

    &.active {
      span {
        font-weight: 600;
      }
    }

    &.active {
      padding-left: 12px;
      transition: padding-left 0.3s cubic-bezier(.34, .65, 0, 1.26);

      &::after {
        opacity: 1;
        transform: scaleY(1);
        transform-origin: center 0%;
        transition: opacity 0.3s, transform 0.3s;
      }
    }
  }
}
</style>