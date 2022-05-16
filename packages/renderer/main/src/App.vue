<script lang="ts" setup>
import { provide, reactive, watch } from 'vue';
import { MSelect } from '@/global/components/select'
import { WindowFrame, WindowControl, WindowBox, SettingControl } from './components/window/'
import { i18ns } from '@/global/i18n'
import { useI18n } from 'vue-i18n';
import { ServerEditor } from './components/serverEditor';
import { GameEditor, GameStatus } from './components/gameManager';
import type { iWindowControlEvent } from './components/window/'
import type { iAppOpenSetting } from './global.method'
import SettingPage from './router/routes/setting/view.vue';
import config, { useConfigStore } from './store/configStore'
import { useServerStore } from '@main/store/serverStore';
import { useGameStore } from '@main/store/gameStore';

const { locale } = useI18n({ useScope: 'global' });
const frame = reactive({ mainVisible: true });
const ServerStore = useServerStore();
const GameStore = useGameStore();
const ConfigStore = useConfigStore();
const openSetting: iAppOpenSetting = () => frame.mainVisible = false;
const onControl = (key: iWindowControlEvent) => {
  switch (key) {
    case 'setting':
      openSetting();
      break;
    case 'closeSetting':
      frame.mainVisible = true;
      break;
  }
}

watch(() => ConfigStore.language, key => {
  locale.value = key;
  config.saveI18nKey(key)
})

// load servers config
ServerStore.load();
GameStore.load();
ConfigStore.load();

provide('AppOpenSetting', openSetting);

</script>

<template>
  <game-status />
  <game-editor>
    <window-box :main-visible="frame.mainVisible">
      <template v-slot:box:main>
        <window-frame>
          <!-- 控制按钮 -->
          <template v-slot:container:control>
            <window-control
              class="_header-control"
              @on-click="onControl"
            />
          </template>

          <!-- 标题区域 -->
          <template v-slot:container:header>
            <m-select
              :items="i18ns"
              v-model:current-key="ConfigStore.language"
              class="_header-i18n"
            />
          </template>

          <template v-slot:container:content>
            <server-editor>
              <router-view v-slot="{ Component }">
                <transition name="router-transition">
                  <component :is="Component" />
                </transition>
              </router-view>
            </server-editor>
          </template>
        </window-frame>
      </template>
      <template v-slot:box:sub>
        <window-frame>
          <template v-slot:container:control>
            <setting-control @on-click="onControl" />
          </template>

          <template v-slot:container:header>
            <span
              class="_header-setting-title"
              v-text="$t('setting.title')"
            />
          </template>

          <template v-slot:container:content>
            <setting-page />
          </template>
        </window-frame>
      </template>
    </window-box>
  </game-editor>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

._header-control,
._header-i18n {
  -webkit-app-region: no-drag;
  opacity: 0;
  animation: header-visible 0.3s 0.3s forwards;
}

._header-setting-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.75);
  margin-left: 13px;
}

._header-control {}

._header-i18n {}

@keyframes header-visible {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.router-transition-enter-active,
.router-transition-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s, transform 0.3s;
}

.router-transition-enter-to,
.router-transition-leave-from {
  opacity: 1;
  transform: scale(1);
}

.router-transition-enter-from,
.router-transition-leave-to {
  opacity: 0;
}

.router-transition-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.router-transition-leave-to {
  transform: scale(0.95);
}
</style>