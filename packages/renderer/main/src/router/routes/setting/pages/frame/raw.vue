<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="setting-content-raw">
    <p
      class="setting-content-raw-title"
      v-text="props.title"
    />
    <div class="setting-content-raw-content">
      <slot />
    </div>
    <hr class="setting-content-raw-line" />
  </div>
</template>

<style lang="scss" scoped>
.setting-content-raw {
  // &:first-child {
  //   padding-top: 8px;
  // }

  &:last-child {
    padding-bottom: 16px;
  }

  & &-title {
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  & &-line {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.06);
    margin-top: 16px;
    margin-bottom: 16px;
  }

  & &-content {}
}
</style>