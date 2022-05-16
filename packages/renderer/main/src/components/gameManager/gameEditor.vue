<script lang="ts" setup>
import { reactive, provide } from 'vue';
import { iGameMethods } from './interface'
import { GameEditorInjectKey } from './useGameEditor';
import { useGameStore } from '@main/store/gameStore';
import { FormBlock } from '../form';

import { MButton } from '@/global/components/button';
import { MDialogWrapper } from '@/global/components/wrapper';
import { MSvgIcon } from '@/global/components/svgIcon';
import { MInput } from '@/global/components/input';
import { MFab, MFabContainer } from '@/global/components/fab'
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
const openDialog = window.dialog.showOpenDialog
const gameVersionParser = window.game.gameVersionParser;
const GameStore = useGameStore();
const dialogRef = reactive({
  visible: false,
  analyzing: false,
  editId: '',
  isEdit: false,
  inputIllegal: {
    remark: false,
    path: false,
  }
})


const gameEditorMethods: iGameMethods = {
  create: () => {
    resetDialog();
    dialogRef.visible = true;
  },
  edit: (id: string) => {
    const client = GameStore.get(id);

    if (!!client) {
      resetDialog();
      dialogRef.visible = true;
      dialogRef.isEdit = true;
      dialogRef.editId = id;
      gameEditorForm.path = client.path;
      gameEditorForm.remark = client.remark;
      updateGameVersion();
    }
  },
}

const gameEditorForm = reactive({
  remark: '',
  path: '',
  version: ''
})

const throwError_remark = () => {
  dialogRef.inputIllegal.remark = true;
}

const closeDialog = () => dialogRef.visible = false;
const saveGame = () => {
  if (!gameEditorForm.remark.trim()) return throwError_remark();
  if (dialogRef.inputIllegal.path || !gameEditorForm.path) return;

  if (dialogRef.isEdit) {
    GameStore.update(dialogRef.editId, {
      id: dialogRef.editId,
      remark: gameEditorForm.remark,
      path: gameEditorForm.path,
    })
  } else {
    GameStore.add(gameEditorForm.remark, gameEditorForm.path, gameEditorForm.version);
  }

  closeDialog();
}

const resetDialog = () => {
  dialogRef.isEdit = false;
  dialogRef.editId = '';
  dialogRef.inputIllegal.remark = false;
  dialogRef.inputIllegal.path = false;
  dialogRef.analyzing = false;
  gameEditorForm.remark = '';
  gameEditorForm.path = '';
  gameEditorForm.version = '';
}

const updateGameVersion = (path: string = gameEditorForm.path) => {
  dialogRef.analyzing = true;
  gameVersionParser(path)
    .finally(() => dialogRef.analyzing = false)
    .then(version => {
      dialogRef.inputIllegal.path = !version;
      if (!!version) gameEditorForm.version = version;
    })
}

const switchGamePath = () => {
  openDialog({
    title: t('game.edit.dialog_title'),
    properties: ['openDirectory']
  })
    .then(({ canceled, filePaths }) => {
      if (canceled || filePaths.length === 0) return;
      const path = filePaths[0];
      gameEditorForm.path = path;
      updateGameVersion();
    })
}

defineExpose(gameEditorMethods);
provide(
  GameEditorInjectKey,
  gameEditorMethods
);
</script>


<template>
  <slot />
  <m-dialog-wrapper v-model:visible="dialogRef.visible">
    <div class="game-edit">
      <div class="game-edit-header">
        <p
          class="title"
          v-text="$t(dialogRef.isEdit ? 'game.edit.edit' : 'game.edit.import')"
        />
        <button
          class="close"
          @click="closeDialog"
        >
          <m-svg-icon
            name="window-close"
            class="icon"
            color="rgba(0, 0, 0, 0.7)"
          />
        </button>
      </div>
      <div class="game-edit-content">
        <form-block :title="$t('game.edit.remark')">
          <m-input
            class="flex-item flex-item-full"
            v-model:value="gameEditorForm.remark"
            v-model:error="dialogRef.inputIllegal.remark"
            :placeholder="$t('game.edit.remark_placeholder')"
          />
        </form-block>
        <form-block :title="$t('game.edit.path')">
          <div
            class="_version"
            :class="{ 'unavailable': dialogRef.inputIllegal.path }"
            v-text="!dialogRef.inputIllegal.path ? gameEditorForm.version : $t('game.edit.unavailable')"
            v-if="!!gameEditorForm.path && !dialogRef.analyzing"
          />
          <m-button
            class="flex-item flex-item-full"
            type="ghost"
            :title="!gameEditorForm.path ? $t('game.edit.path_placeholder') : gameEditorForm.path"
            :disabled="dialogRef.analyzing"
            @click="switchGamePath"
          />
        </form-block>
      </div>
    </div>
  </m-dialog-wrapper>
  <m-fab-container :visible="dialogRef.visible">
    <m-fab
      icon="fab-save"
      :tooltip="$t('game.edit.save_fab')"
      @click="saveGame"
    />
  </m-fab-container>
</template>

<style lang="scss" scoped>
.game-edit {
  display: flex;
  flex-direction: column;
  width: 380px;

  & &-header {
    height: 48px;
    padding: 0 8px;
    display: flex;
    flex-direction: row;
    align-items: center;


    .title {
      margin-left: 10px;
      font-size: 13px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: auto;
    }

    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.15s;

      .icon {
        width: 14px;
        height: 14px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.14);
      }
    }
  }

  & &-content {
    flex: 1;
    padding: 0 19px;
    display: flex;
    flex-direction: column;

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

        .flex-item {
          margin-right: 10px;

          &:last-child {
            margin-right: 0px;
          }
        }

        .flex-item-full {
          flex: 1;
        }

        .flex-item-3-1 {
          flex: 1;
        }

        .flex-item-3-2 {
          flex: 2;
        }

        ._version {
          display: flex;
          align-items: center;
          margin-right: 6px;
          font-size: 13px;
          font-weight: 500;
          padding: 0 14px;
          color: white;
          background-color: #4B69FF;
          border-radius: 4px;

          &.unavailable {
            background-color: #FF5757;
          }
        }
      }
    }
  }
}
</style>