<script lang="ts" setup>
import { reactive, provide } from 'vue';
import { iServerMethods } from './interface'
import { ServerEditorInjectKey } from './useServerEditor';
import { serverCodeParser, argsChecker } from '@main/server'
import { useServerStore } from '@main/store/serverStore';
import { FormBlock } from '../form';

import { MButton } from '@/global/components/button';
import { MDialogWrapper } from '@/global/components/wrapper';
import { MSvgIcon } from '@/global/components/svgIcon';
import { MInput } from '@/global/components/input';
import { MFab, MFabContainer } from '@/global/components/fab'

const ServerStore = useServerStore();
const dialogRef = reactive({
  visible: false,
  editId: '',
  isEdit: false,
  isCode: false,
  inputIllegal: {
    code: false,
    name: false,
    host: false,
    port: false,
  }
})

const dialogCallbacks: {
  [key: string]: undefined | ((id: string) => void)
} = reactive({
  editCallBack: undefined,
})

const serverEditorMethods: iServerMethods = {
  create: () => {
    resetDialog();
    dialogRef.visible = true;
    dialogRef.isEdit = false;
  },
  edit: (id: string, call?: (id: string) => void) => {
    const preServer = ServerStore.get(id);

    if (!!preServer) {
      resetDialog();
      dialogRef.editId = preServer.id;
      dialogRef.visible = true;
      dialogRef.isEdit = true;
      dialogRef.isCode = false

      serverEditorForm.name = preServer.title;
      serverEditorForm.host = preServer.host;
      serverEditorForm.port = `${preServer.port}`;
      dialogCallbacks.editCallBack = call;
    }
  }
}

const serverEditorForm = reactive({
  port: "",
  host: "",
  name: "",
  code: ""
})


const readClipboardCode = () => {
  const clipboard = window.clipboard
  if (!clipboard) return;

  clipboard
    .get()
    .then(text => {
      serverEditorForm.code = text;
      dialogRef.inputIllegal.code = false;
    })
}

const throwError_host = () => {
  dialogRef.inputIllegal.host = true;
}

const throwError_name = () => {
  dialogRef.inputIllegal.name = true;
}

const throwError_port = () => {
  dialogRef.inputIllegal.port = true;
}

const throwError_code = () => {
  dialogRef.inputIllegal.code = true
}

const saveServer = () => {
  let originData;

  if (dialogRef.isCode) {
    originData = serverCodeParser(serverEditorForm.code);
    if (originData === null) {
      dialogRef.inputIllegal.code = true
      return;
    };
  }
  else originData = serverEditorForm;

  // args checker
  let port = originData.port
  const { host, name } = originData;
  const result = argsChecker(host, port, name)

  if (dialogRef.isCode) {
    if (result !== 0) throwError_code();
  } else {
    switch (result) {
      case 1: {
        port = 443;
        break;
      }
      case 0: {
        port = +port;
        break;
      }
      case -1: return throwError_name();
      case -2: return throwError_host();
      case -3: return throwError_port();
      default: return;
    }
  }

  // Edit or Create?
  if (dialogRef.isEdit) {
    const preServer = ServerStore.get(dialogRef.editId);
    if (!!preServer)
      ServerStore.update(
        dialogRef.editId,
        {
          ...preServer,
          host,
          port: +port,
          title: name,
          lastUpdateTime: 0
        },
        dialogCallbacks.editCallBack
      );
  }
  else {
    ServerStore.add(host, +port, name);
  }

  closeDialog();
}

const resetDialog = () => {
  dialogRef.isEdit = false;
  dialogRef.isCode = false;
  serverEditorForm.code = "";
  serverEditorForm.port = "";
  serverEditorForm.host = "";
  serverEditorForm.name = "";
  dialogRef.inputIllegal = {
    code: false,
    name: false,
    host: false,
    port: false,
  }
}

const closeDialog = () => {
  dialogRef.visible = false
}

defineExpose(serverEditorMethods);
provide(
  ServerEditorInjectKey,
  serverEditorMethods
);
</script>


<template>
  <slot />
  <m-dialog-wrapper v-model:visible="dialogRef.visible">
    <div class="server-edit">
      <div class="server-edit-header">
        <p
          class="title"
          v-text="$t(dialogRef.isEdit ? 'server.edit.edit' : 'server.edit.import')"
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
      <div class="server-edit-content">
        <form-block
          :title="$t('server.edit.name')"
          v-if="!dialogRef.isCode"
        >
          <m-input
            class="flex-item flex-item-full"
            v-model:value="serverEditorForm.name"
            v-model:error="dialogRef.inputIllegal.name"
            :placeholder="$t('server.edit.name_placeholder')"
          />
        </form-block>
        <form-block
          :title="$t('server.edit.config')"
          v-if="!dialogRef.isCode"
        >
          <m-input
            class="flex-item flex-item-3-2"
            v-model:value="serverEditorForm.host"
            v-model:error="dialogRef.inputIllegal.host"
            :placeholder="$t('server.edit.hostname_placeholder')"
          />
          <m-input
            class="flex-item flex-item-3-1"
            v-model:value="serverEditorForm.port"
            v-model:error="dialogRef.inputIllegal.port"
            :placeholder="`${$t('server.edit.port_placeholder')}(443)`"
          />
        </form-block>
        <form-block
          :title="$t('server.edit.code')"
          v-if="dialogRef.isCode"
        >
          <m-input
            class="flex-item flex-item-full"
            v-model:value="serverEditorForm.code"
            v-model:error="dialogRef.inputIllegal.code"
            :placeholder="$t('server.edit.code_placeholder')"
          />
          <m-button
            type="ghost"
            :title="$t('server.edit.paste')"
            @click="readClipboardCode"
          />
        </form-block>
      </div>
    </div>
  </m-dialog-wrapper>
  <m-fab-container :visible="dialogRef.visible">
    <m-fab
      icon="fab-save"
      :tooltip="$t('server.edit.save_fab')"
      @click="saveServer"
    />
    <m-fab
      theme="blue"
      :icon="dialogRef.isCode ? 'fab-edit' : 'fab-code'"
      :tooltip="$t(dialogRef.isCode ? 'server.edit.edit_fab' : 'server.edit.code_fab')"
      @click="dialogRef.isCode = !dialogRef.isCode"
      v-if="!dialogRef.isEdit"
    />
  </m-fab-container>
</template>

<style lang="scss" scoped>
.server-edit {
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
      }
    }
  }
}
</style>