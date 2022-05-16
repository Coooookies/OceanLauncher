<script lang="ts" setup>
import { MSvgIcon } from '@/global/components/svgIcon';
const props = defineProps<{
  icon?: string,
  title: string
}>()
</script>

<template>
  <div class="m-tag">
    <m-svg-icon
      v-if="props.icon"
      :name="props.icon"
      class="icon"
      color="rgba(0, 0, 0, 0.7)"
    />
    <span
      class="title"
      v-text="props.title"
    />
  </div>
</template>

<style lang="scss" scoped>
.m-tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 26px;
  padding: 0 14px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 26px;

  .title {
    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
  }

  .icon {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
}
</style>