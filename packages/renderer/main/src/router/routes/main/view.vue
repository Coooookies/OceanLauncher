<script lang="ts" setup>
import { ServerSwiper, iServerSwipperExport } from './serverSwiper';
import { MSvgIcon } from '@/global/components/svgIcon';
import { MErrorPageNotFound } from '@/global/components/errorPage';
import { useServerEditor } from '@main/components/serverEditor';
import { useServerStore } from '@main/store/serverStore';
import { useGameStore } from '@/main/src/store/gameStore';
import { useGamaManager } from '@/main/src/hook/useGamaManager';
import { serverCodeBuilder, ServerUpdatePool } from '@main/server';
import { computed, onMounted, ref } from 'vue';

const ServerEditor = useServerEditor();
const ServerStore = useServerStore();
const GameStore = useGameStore();
const ServerUpdate = new ServerUpdatePool();
const GameManager = useGamaManager();
const ServerSwiperRef = ref<iServerSwipperExport>();
const ServerSwiperMethod = computed(() => ServerSwiperRef.value);

const SwiperOnEdit = (id: string) => ServerEditor.edit(id, _id =>
  ServerUpdate.updateServer(_id));

const SwiperOnDelete = (id: string) =>
  ServerStore.delete(id);

const SwiperOnChange = (id: string) => ServerUpdate.updateServer(id);
const SwiperOnRefresh = (id: string) => ServerUpdate.updateServer(id);
const SwiperOnExport = (id: string) => {
  const server = ServerStore.get(id);

  if (!!server) {
    const { host, port, title } = server;
    const code = serverCodeBuilder(title, host, port);
    console.log(code)
  }
}

const SwiperOnPlay = (id: string) => {
  const server = ServerStore.get(id);

  if (!!server && server.status === 'online') {
    const client = GameStore.clients.find(cli => cli.available && cli.version === server.version);
    if (!!client) {
      GameManager.start(client.path, server)
    }
  }
}

onMounted(() => {
  const server = GameManager.getLastedServer();

  if (!!server){
    ServerSwiperMethod.value!.slideTo(server.id);
  }
})


</script>

<template>
  <div
    class="server-panel"
    v-if="ServerStore.servers.length <= 0"
  >
    <m-error-page-not-found
      class="server-panel-notfound"
      icon="emoji-thinking"
      :button-title="$t('server.guide.import')"
      :title="$t('server.guide.notfound')"
      @button-on-click="ServerEditor.create()"
    />
  </div>
  <div
    class="server-panel"
    v-else
  >
    <div class="server-panel-bar">
      <button
        class="server-panel-bar_add"
        @click="ServerEditor.create()"
      >
        <m-svg-icon
          class="icon"
          name="server-add"
          color="black"
        />
        <span
          class="title"
          v-text="$t('server.guide.import')"
        />
      </button>
    </div>
    <div class="server-panel-swiper">
      <server-swiper
        :servers="ServerStore.servers"
        @on-change="SwiperOnChange"
        @on-play="SwiperOnPlay"
        @on-export="SwiperOnExport"
        @on-edit="SwiperOnEdit"
        @on-delete="SwiperOnDelete"
        @on-refresh="SwiperOnRefresh"
        ref="ServerSwiperRef"
      />
    </div>
  </div>
</template>

<style lang="scss">
.server-panel {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  height: 100%;

  & &-notfound {
    flex: 1;
    padding-bottom: 52px;
  }

  & &-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 28px;
    margin-bottom: 10px;

    &_add {
      height: 28px;
      padding: 0 10px;
      cursor: pointer;
      background-color: transparent;
      border-radius: 5px;
      transition: background-color 0.15s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
        transition: none;
      }

      .icon {
        width: 10px;
        height: 10px;
        margin-right: 6px;
      }

      .title {
        font-size: 13px;
        font-weight: 600;
        color: black;
      }

      .icon,
      .title {
        opacity: 0.6;
      }
    }
  }

  & &-bar,
  & &-swiper {
    opacity: 0;
    animation: view-visible 0.6s 0.3s forwards;
    width: 100%;
  }

  & &-bar {
    animation-delay: 0.5s;
  }

  & &-swiper {
    flex: 1;
    animation-delay: 0.7s;
  }
}

@keyframes view-visible {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>