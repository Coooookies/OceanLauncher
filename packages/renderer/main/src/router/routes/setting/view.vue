<script lang="ts" setup>
import PageGeneralConfig from './pages/generalConfig/view.vue'
import PageGameConfig from './pages/gameConfig/view.vue'
import PageProxyConfig from './pages/proxyConfig/view.vue'
import PageAbout from './pages/about/view.vue'


import { MScrollContainer } from '@/global/components/scroll';
import { MNav } from '@/global/components/nav';
import { reactive } from 'vue';

const settingRef = reactive({
  currentId: 0
})

const navUpdateHandler = () => {
}

</script>

<template>
  <div class="setting-panel">
    <div class="setting-panel-nav">
      <m-nav
        @on-update="navUpdateHandler"
        v-model:current-id="settingRef.currentId"
        :items="(() => [{
          id: 0,
          title: $t('setting.setting_general')
        }, {
          id: 1,
          title: $t('setting.setting_game')
        }, {
          id: 2,
          title: $t('setting.setting_proxy')
        }, {
          id: 3,
          title: $t('setting.setting_about')
        }])()"
      />
    </div>
    <div class="setting-panel-content">
      <m-scroll-container
        :disabledBlur="true"
        class="container"
      >
        <transition name="container-visible-transition">
          <page-general-config v-if="settingRef.currentId === 0" />
        </transition>
        <transition name="container-visible-transition">
          <page-game-config v-if="settingRef.currentId === 1" />
        </transition>
        <transition name="container-visible-transition">
          <page-proxy-config v-if="settingRef.currentId === 2" />
        </transition>
        <transition name="container-visible-transition">
          <page-about v-if="settingRef.currentId === 3" />
        </transition>
      </m-scroll-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.setting-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  & &-nav {
    width: 140px;
    padding-left: 20px;
    box-sizing: border-box;
  }

  & &-content {
    position: relative;
    flex: 1;

    .container {
      height: 100%;
    }
  }
}

.container-visible-transition-enter-active {
  position: absolute;
  transition: opacity 0.3s, transform 0.3s;
  top: 0;
}

.container-visible-transition-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.container-visible-transition-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>