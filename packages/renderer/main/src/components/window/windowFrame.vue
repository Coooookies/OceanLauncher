<script setup lang="ts">
// import windowControl from './windowControl.vue';
</script>

<template>
  <div class="main-container">
    <div class="main-container-header">
      <div class="main-container-header-title">
        <slot name="container:header" />
      </div>
      <div class="main-container-header-control">
        <slot name="container:control" />
      </div>
    </div>
    <div class="main-container-content">
      <slot name="container:content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &-header {
    height: 52px;
    display: flex;
    flex-direction: row;
    position: relative;


    &-title {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      padding: 0 8px;
      -webkit-app-region: drag;
    }

    &-control {}
  }


  &-content {
    flex: 1;
    overflow: hidden;
    position: relative;
    
  }
}
</style>
