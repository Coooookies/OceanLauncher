<script lang="ts" setup>
import { useGamaManager } from '@/main/src/hook/useGamaManager';
import { MSvgIcon } from '@/global/components/svgIcon';
import { MSignal } from '@/global/components/signal';
import { MButton } from '@/global/components/button';
import { onBeforeUnmount, onMounted, reactive } from 'vue';

let pingTimer: number | undefined;

const tcping = window.tcping;
const gameManager = useGamaManager();
const gameServer = gameManager.getCurrentServer()!;
const gameStatusRef = reactive({
  hideDetail: false,
  ping: -1,
})

const startPingTimer = () => {
  const server = gameManager.getCurrentServer();
  if (!gameManager.isRuning() || !server) return;

  tcping.ping(server.host, server.port, 8000)
    .then(result => gameStatusRef.ping = result.duration)
    .finally(() => pingTimer = window.setTimeout(startPingTimer, 10000))
}


onMounted(() => startPingTimer());
onBeforeUnmount(() => window.clearTimeout(pingTimer));

</script>

<template>
  <div class="server-status-panel">
    <div class="server-status-panel_overview">
      <m-signal :ping="gameStatusRef.ping" />
      <div class="_server-name">
        <p
          class="_server-name-title"
          v-text="gameServer.title"
        />
      </div>
      <div class="_server-detail">
        <p
          class="_server-detail-host-title"
          v-text="$t('launch.status.host')"
        />
        <div class=_server-detail-host-host>
          <span v-text="gameStatusRef.hideDetail ? '---.---.---.---' : gameServer.host" />
          <div class="_point" />
          <span v-text="gameStatusRef.hideDetail ? '----' : gameServer.port" />
          <button
            class="_hide"
            @click="gameStatusRef.hideDetail = !gameStatusRef.hideDetail"
          >
            <m-svg-icon
              name="server-visible"
              class="_hide-icon"
              v-if="gameStatusRef.hideDetail"
            />
            <m-svg-icon
              name="server-blind"
              class="_hide-icon"
              v-else
            />
          </button>
        </div>
      </div>
      <div class="_server-action">
        <m-button
          class="_server-action-button"
          type="primary"
          :title="$t('launch.status.killprocess')"
          @click="gameManager.stop()"
        />
        <m-button
          class="_server-action-button"
          type="ghost"
          :title="$t('launch.status.export')"
        />
      </div>
    </div>
    <div class="server-status-panel_banner">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.server-status-panel {
  display: flex;
  flex-direction: row;
  height: 100%;

  & &_overview {
    width: 280px;
    margin-bottom: 52px;
    padding-left: 38px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;


    ._server-action {
      display: flex;
      flex-direction: row;
      margin-top: 48px;

      &-button {
        margin-right: 8px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    ._server-name {
      &-title {
        margin-top: 4px;
        line-height: 36px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 28px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.7)
      }
    }

    ._server-detail {
      margin-top: 35px;

      &-host-title {
        line-height: 16px;
        font-size: 13px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.3)
      }

      &-host-host {
        margin-top: 2px;
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          font-size: 13px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.7);
          line-height: 20px;
        }

        ._point {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
          margin-left: 5px;
          margin-right: 5px;
        }

        ._hide {
          margin-left: 6px;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background-color: transparent;
          transition: background-color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          &-icon {
            width: 16px;
            height: 16px;
            opacity: 0.25;
          }

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      }
    }

    overflow: hidden;
  }

  & &_banner {
    flex: 1;
  }
}
</style>