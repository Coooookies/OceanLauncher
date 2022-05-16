<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="form-block">
    <p
      class="form-block-title"
      v-text="props.title"
    />
    <div class="form-block-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-block {
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 20px;
  }

  &-title {
    margin: 12px 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.7);
  }

  &-content {
    display: flex;
    flex-direction: row;
  }
}
</style>