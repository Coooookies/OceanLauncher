<script lang="ts" setup>
import SettingRaw from '../frame/raw.vue';

</script>

<template>
  <div class="setting-content">
    <setting-raw :title="$t('setting.notfound')" />
  </div>
</template>

<style lang="scss" scoped>
.setting-content {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>