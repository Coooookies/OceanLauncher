<script lang="ts" setup>
import { MSvgIcon } from '@/global/components/svgIcon';
import { MTag } from '@/global/components/tag';
import { MButton } from '@/global/components/button';
import { MLoaderCyl } from '@/global/components/loader';
import { MContextMenu } from '@/global/components/contextMenu';
import { MSignal } from '@/global/components/signal';
import { iServerType } from '@main/server/interface'
import { calcTimeDiff } from '@/global/utils';
import { reactive, ref, computed } from 'vue';

const emits = defineEmits<{
  (e: 'onPlay'): void,
  (e: 'onEdit'): void,
  (e: 'onDelete'): void,
  (e: 'onExport'): void,
  (e: 'onRefresh'): void
}>()
const contextMenu = reactive({
  visible: false,
  left: 0,
  top: 0
})

const props = defineProps<{
  server: iServerType,
}>()

const cardRef = ref<HTMLDivElement>();
const cardRefBox = computed(() => cardRef.value);
const openMenuPopup = () => {
  const { x, y, width } = cardRefBox.value!.getBoundingClientRect();
  contextMenu.left = x + width - 8;
  contextMenu.top = y + 8;
  contextMenu.visible = true;
}

const contextMenuHandler = (id: number) => {
  switch (id) {
    case 1:
      emits('onEdit');
      break;
    case 2:
      emits('onExport');
      break;
    case 3:
      emits('onDelete');
      break;
  }
}
</script>

<template>
  <m-context-menu
    v-model:visible="contextMenu.visible"
    :items="(() => [{
      type: 'item',
      icon: 'context-edit',
      title: $t('server.card.menu.edit'),
      id: 1
    }, {
      type: 'item',
      icon: 'context-export',
      title: $t('server.card.menu.export'),
      id: 2
    }, {
      type: 'line',
    }, {
      type: 'item',
      icon: 'context-delete',
      title: $t('server.card.menu.delete'),
      warn: true,
      id: 3
    }])()"
    :left="contextMenu.left"
    :top="contextMenu.top"
    :horizontal="'right'"
    @on-switch="contextMenuHandler"
  />
  <div
    class="card-server"
    ref="cardRef"
  >
    <div class="card-server-status">
      <m-signal
        class="card-server-status-network"
        v-if="props.server.status === 'online' && props.server.ping !== -1"
        :ping="props.server.ping"
      />
      <m-signal
        class="card-server-status-network"
        :content="$t(props.server.status === 'loading' ? 'server.card.loading' : 'server.card.notconnection')"
        :ping="-1"
        v-else
      />
      <div class="card-server-status-control">
        <button
          class="control-button control-refresh"
          @click="emits('onRefresh')"
        >
          <m-svg-icon
            name="server-refresh"
            class="icon"
            color="rgba(0, 0, 0, 0.7)"
          />
        </button>
        <button
          class="control-button control-more"
          @click="openMenuPopup"
        >
          <m-svg-icon
            name="server-more"
            class="icon"
            color="rgba(0, 0, 0, 0.7)"
          />
        </button>
      </div>
    </div>
    <div class="card-server-info">
      <div class="card-server-info-description">
        <p
          class="title"
          v-text="props.server.title"
        />
        <p class="subtitle">
          <span
            v-if="props.server.status === 'online' && !!props.server.version"
            v-text="`${props.server.version} | `"
          />
          <span v-text="`${$t('server.card.created')} `" />
          <span v-t="calcTimeDiff(props.server.createTime)" />
        </p>
      </div>
      <div class="card-server-info-launch">
        <m-loader-cyl
          class="loader"
          v-if="props.server.status === 'loading'"
        />
        <m-button
          class="submit"
          type="primary"
          icon="server-play"
          :title="$t(props.server.status !== 'online' ? 'server.card.offline' : props.server.allowPc ? 'server.card.play' : 'server.card.unsupported')"
          :disabled="props.server.status !== 'online' || !props.server.allowPc"
          @click="emits('onPlay')"
          shader
          v-else
        />
      </div>
    </div>
    <div class="card-server-tag">
      <m-tag
        v-if="props.server.status === 'online' && props.server.playerCount !== -1"
        :title="`${props.server.playerCount}`"
        icon="server-player"
        class="tag"
      />
      <m-tag
        v-else
        title="--"
        icon="server-player"
        class="tag"
      />
      <m-tag
        v-if="props.server.status === 'online'"
        :title="`${props.server.regions.length}`"
        icon="server-region"
        class="tag"
      />
      <m-tag
        v-else
        title="--"
        icon="server-region"
        class="tag"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-server {
  display: flex;
  flex-direction: column;

  width: 357px;
  height: 368px;
  background-color: white;

  & &-status {
    align-items: center;

    margin-top: 18px;
    height: 22px;

    &-control {
      margin-left: auto;

      .control-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-left: 8px;

        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: transparent;
        transition: background-color 0.15s;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        &:first-child {
          margin-left: 0;
        }
      }
    }

    &-network,
    &-control {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  & &-info {
    margin-top: 124px;

    &-description {
      flex: 1;
      overflow: hidden;

      p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-weight: 600;

        &.title {
          line-height: 28px;
          font-size: 22px;
          color: rgba(0, 0, 0, 0.8);
        }

        &.subtitle span {
          line-height: 16px;
          margin-top: 2px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.38);
        }
      }
    }

    &-launch {
      display: flex;
      flex-direction: row;
      align-items: center;

      .submit {
        height: 40px;
        width: 82px;
        animation: submit-launch-visible 0.35s forwards;
      }

      .loader {
        width: 30px;
        height: 30px;
        animation: submit-pending-visible 0.2s forwards;
      }
    }
  }

  & &-tag {
    margin-top: 19px;

    .tag {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  & &-tag,
  & &-status,
  & &-info {
    display: flex;
    flex-direction: row;
    padding: 0 22px;
  }
}

@keyframes submit-launch-visible {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes submit-pending-visible {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>