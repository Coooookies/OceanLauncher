<script lang="ts" setup>
import { MPopupWrapper } from '../wrapper';
import { MSvgIcon } from '../svgIcon';
import { ref, reactive, computed } from 'vue';
import SelectMenu from './selectMenu.vue'
import type { iSelectItem } from './interface'

const emits = defineEmits<{
  (e: "update:currentKey", key: string): void
}>()

const props = defineProps<{
  currentKey: string,
  items: Array<iSelectItem>,
  hasBgColor?: boolean,
}>()

const selectBoxRef = ref<HTMLDivElement>();
const selectBox = computed(() => selectBoxRef.value);
const selectPopupStatus = reactive({
  visible: false,
  left: 0,
  top: 0
})

const openSelectPopup = () => {
  const { x, y } = selectBox.value!.getBoundingClientRect();
  selectPopupStatus.left = x;
  selectPopupStatus.top = y;
  selectPopupStatus.visible = true;
}

const switchSelect = (key: string) => {
  emits("update:currentKey", key);
  selectPopupStatus.visible = false;
}

const getCurrentItem = computed(() =>
  props.items.find(item => item.key === props.currentKey))
</script>

<template>
  <div class="m-select">
    <div
      class="m-select-box"
      :class="{ 'bg-color': props.hasBgColor }"
      ref="selectBoxRef"
      @click="openSelectPopup"
    >
      <span
        v-if="getCurrentItem"
        v-text="getCurrentItem?.title"
        class="_title"
      />
      <m-svg-icon
        name="select-arrow"
        class="_arrow"
        color="rgba(0, 0, 0, 0.75)"
      />
    </div>
    <m-popup-wrapper
      v-model:visible="selectPopupStatus.visible"
      :left="selectPopupStatus.left"
      :top="selectPopupStatus.top"
    >
      <select-menu
        :items="props.items"
        :current-key="props.currentKey"
        @on-update="switchSelect"
      />
    </m-popup-wrapper>
  </div>
</template>

<style lang="scss" scoped>
.m-select {
  position: relative;
  height: 36px;

  &-box {
    height: 100%;
    padding: 0 13px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
    transition: background-color 0.1s;
    cursor: pointer;

    &.bg-color {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &.bg-color:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    ._title {
      font-size: 13px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.75);
    }

    ._arrow {
      width: 10px;
      height: 10px;
      margin-left: 6px;
    }
  }

  &-popup {}
}
</style>