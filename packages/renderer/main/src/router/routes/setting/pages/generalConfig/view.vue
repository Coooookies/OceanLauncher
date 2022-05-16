<script lang="ts" setup>
import { MSelect } from '@/global/components/select'
import { i18ns } from '@/global/i18n'
import { useConfigStore } from '@main/store/configStore'
import SettingRaw from '../frame/raw.vue';

const configStore = useConfigStore();

</script>

<template>
  <div class="setting-content">
    <setting-raw :title="$t('setting.setting_general_content.language')">
      <div class="_content">
        <m-select
          :items="i18ns"
          v-model:current-key="configStore.language"
          has-bg-color
        />
      </div>
    </setting-raw>
  </div>
</template>

<style lang="scss" scoped>
.setting-content {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  ._content {
    display: flex;
    flex-direction: row;

  }
}
</style>