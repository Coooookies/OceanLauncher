<script lang="ts" setup>
import { MPopupWrapper } from '../wrapper';
import { MSvgIcon } from '../svgIcon';
import { reactive, watch } from 'vue'
import { iMContextMenuItem } from './interface'

const emits = defineEmits<{
  (e: 'onSwitch', id: number): void,
  (e: 'update:visible', visible: boolean): void
}>();

const props = defineProps<{
  items: Array<iMContextMenuItem>,
  visible: boolean,
  left: number,
  top: number,
  vertical?: 'top' | 'bottom',
  horizontal?: 'left' | 'right',
}>();

const selectPopupStatus = reactive({
  visible: false,
})

watch(() => props.visible, visible => {
  selectPopupStatus.visible = visible;
});

watch(() => selectPopupStatus.visible, visible => {
  emits('update:visible', visible)
});

const switchHandler = (id: number) => {
  emits('onSwitch', id);
  selectPopupStatus.visible = false;
}

</script>

<template>
  <m-popup-wrapper
    v-model:visible="selectPopupStatus.visible"
    :left="props.left"
    :top="props.top"
    :vertical="props.vertical"
    :horizontal="props.horizontal"
  >
    <ul class="m-context-menu">
      <label v-for="item in props.items">
        <li
          class="m-context-menu-line"
          v-if="item.type === 'line'"
        />
        <li
          class="m-context-menu-item"
          :class="{
            'disabled': !!item.disabled,
            'warn': !!item.warn
          }"
          @click="switchHandler(item.id)"
          v-else-if="item.type === 'item'"
        >
          <m-svg-icon
            v-if="!!item.icon"
            :name="item.icon"
            :color="item.warn ? 'rgb(255, 68, 68)' : 'black'"
            class="m-context-menu-item-icon"
          />
          <span
            class="m-context-menu-item-title"
            v-text="item.title"
          />
        </li>
      </label>
    </ul>
  </m-popup-wrapper>
</template>

<style lang="scss" scoped>
.m-context-menu {
  padding: 6px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  &-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    height: 40px;
    min-width: 120px;
    transition: background-color 0.1s;
    border-radius: 3px;
    cursor: pointer;


    &-icon {
      width: 22px;
      height: 22px;
    }

    &-title {
      margin-left: 30px;
      font-size: 13px;
      font-weight: 600;
      color: black;
    }

    &-icon+&-title {
      margin-left: 8px;
    }

    &-icon,
    &-title {
      opacity: 0.7;
      transition: opacity 0.1s;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.11);

      .m-context-menu-item-icon,
      .m-context-menu-item-title {
        opacity: 0.85;
      }
    }

    &.warn {
      .m-context-menu-item-title {
        color: rgb(255, 68, 68);
      }

      &:hover {
        background-color: rgba(255, 85, 85, 0.2);
      }
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &-line {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 4px;
  }
}
</style>