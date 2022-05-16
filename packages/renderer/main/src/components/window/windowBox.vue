<script setup lang="ts">
const props = defineProps<{
  mainVisible: boolean;
}>()
</script>

<template>
  <div class="main-box">
    <transition name="sub-box">
      <div
        class="sub-content"
        v-show="!props.mainVisible"
      >
        <slot name="box:sub" />
      </div>
    </transition>
    <transition name="main-box">
      <div
        class="main-content"
        v-if="props.mainVisible"
      >
        <slot name="box:main" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.main-box {
  position: relative;
  height: 100vh;
  width: 100%;

  .main-content,
  .sub-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .main-content {
    z-index: 0;
  }

  .sub-content {
    z-index: 1;
  }
}

.sub-box-enter-active,
.sub-box-leave-active,
.main-box-enter-active,
.main-box-leave-active {
  transition: opacity 0.3s, transform 0.3s cubic-bezier(.3, .18, .24, 1.4);
}


.sub-box-enter-to,
.main-box-enter-to {
  transform: scale(1);
  opacity: 1;
}


.sub-box-leave-to,
.main-box-leave-to,
.sub-box-enter-from,
.main-box-enter-from {
  opacity: 0;
}

.sub-box-enter-from,
.sub-box-leave-to {
  transform: scale(1.1);
}

.main-box-enter-from,
.main-box-leave-to {
  transform: scale(0.9);
}
</style>
