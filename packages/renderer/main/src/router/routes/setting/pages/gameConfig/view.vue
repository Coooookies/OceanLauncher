<script lang="ts" setup>
import SettingRaw from '../frame/raw.vue';
import { MButton } from '@/global/components/button';
import { GameManager, useGameEditor } from '@main/components/gameManager'
import { useGameStore } from '@main/store/gameStore';


const GameEditor = useGameEditor();
const GameStore = useGameStore();

const gameOnCreate = () => GameEditor.create();
const gameOnEdit = (id: string) => GameEditor.edit(id);
const gameOnDelete = (id: string) => GameStore.delete(id);

</script>

<template>
  <div class="setting-content">
    <setting-raw
      :title="$t('setting.setting_game_content.manager')"
      class="setting-content-game"
    >
      <game-manager
        class="setting-content-game-manager"
        @on-edit="gameOnEdit"
        @on-delete="gameOnDelete"
      />
      <m-button
        class="setting-content-game-add"
        type="ghost"
        :title="$t('setting.setting_game_content.add')"
        :arrow="true"
        @click="gameOnCreate"
      />
    </setting-raw>
  </div>
</template>

<style lang="scss" scoped>
.setting-content {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  & &-game {
    &-manager {
      margin-bottom: 14px;
    }

    &-add {}
  }
}
</style>