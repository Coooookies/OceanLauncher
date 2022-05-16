<script lang="ts" setup>
import { MButton } from '@/global/components/button';
import { MSvgIcon } from '@/global/components/svgIcon';

const emits = defineEmits<{
  (e: 'buttonOnClick'): void;
}>()

const props = defineProps<{
  title: string,
  icon: string,
  buttonTitle: string,
}>()

</script>

<template>
  <div class="error-page-notfound">
    <m-svg-icon
      class="error-page-notfound-emoji"
      :name="props.icon"
    />
    <p
      class="error-page-notfound-tip"
      v-text="props.title"
    />
    <m-button
      class="error-page-notfound-submit"
      type="ghost"
      :title="props.buttonTitle"
      :arrow="true"
      @click="emits('buttonOnClick')"
    />
  </div>
</template>

<style lang="scss" scoped>
.error-page-notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-emoji {
    width: 36px;
    height: 36px;
    margin-bottom: 10px;
  }

  &-tip {
    margin-bottom: 28px;
    color: rgba(0, 0, 0, 0.75);
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
  }

  &-emoji,
  &-tip {
    opacity: 0;
    animation: view-visible 0.5s forwards;
  }

  &-emoji {
    animation-delay: 0.4s;
  }

  &-tip {
    animation-delay: 0.45s;
  }

  &-submit {
    opacity: 0;
    animation: button-visible 0.35s forwards cubic-bezier(.3, .18, .24, 1.4);
    animation-delay: 0.7s;
  }
}

@keyframes view-visible {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes button-visible {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>