<script lang="ts" setup>
import type { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCards } from "swiper";
import { nextTick, reactive, ref } from 'vue';
import "swiper/css";
import "swiper/css/effect-cards";
import ServerCard from '@main/components/card/server.vue';
import { MSvgIcon } from '@/global/components/svgIcon';
import { iServerType } from '@main/server';

const emits = defineEmits<{
  (e: 'onChange', serverId: string): void,
  (e: 'onPlay', serverId: string): void,
  (e: 'onEdit', serverId: string): void,
  (e: 'onDelete', serverId: string): void,
  (e: 'onExport', serverId: string): void,
  (e: 'onRefresh', serverId: string): void
}>();

const props = defineProps<{
  servers: Array<iServerType>
}>();

// get Swiper instance
const SwiperRef = ref<SwiperType>();
const onSwiperRef = (swipper: SwiperType) => {
  SwiperRef.value = swipper;
  onSwiperChange(swipper);
}

const onSwiperChange = (swiper: SwiperType) => {
  const swiperIndex: number = swiper.activeIndex;
  const swiperLength: number = swiper.slides.length;

  swiperControlStatus.allowPrev = swiperIndex > 0;
  swiperControlStatus.allowNext = swiperIndex < swiperLength - 1;

  if (swiperLength > 0)
    emits('onChange', props.servers[swiperIndex].id);
}

const swiperControlStatus = reactive({
  allowPrev: true,
  allowNext: true,
  lastSlidesLength: 0,
});

const onSwiperSlidesLengthChange = (swiper: SwiperType) => {
  const lastLength = swiperControlStatus.lastSlidesLength;
  const swiperIndex: number = swiper.activeIndex;
  const swiperLength: number = swiper.slides.length;

  // Length changed but Index isn't changed
  if (swiperLength - lastLength === 1) {
    nextTick(() => swiper.slideTo(swiperLength))
  } else if (swiperLength < lastLength && swiperIndex !== swiperLength) { // if index isn't last child's index
    nextTick(() => onSwiperChange(swiper))
  }

  // update index
  swiperControlStatus.lastSlidesLength = swiperLength;
}

const onPlayHandler = (serverId: string) =>
  emits('onPlay', serverId);

const onEditHandler = (serverId: string) =>
  emits('onEdit', serverId);

const onDeleteHandler = (serverId: string) =>
  emits('onDelete', serverId);

const onExportHandler = (serverId: string) =>
  emits('onExport', serverId);

const onRefreshHandler = (serverId: string) =>
  emits('onRefresh', serverId);


defineExpose({
  slideTo: (serverId: string) => {
    const index = props.servers.findIndex(server => server.id === serverId);
    if (index !== -1) SwiperRef.value?.slideTo(index);
  }
})

</script>

<template>
  <div class="swiper-container">
    <swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="[EffectCards]"
      :cardsEffect="{
        rotate: true
      }"
      class="swiper-container-items"
      @swiper="onSwiperRef"
      @slide-change="onSwiperChange"
      @slides-length-change="onSwiperSlidesLengthChange"
    >
      <swiper-slide v-for="server in props.servers">
        <server-card
          :server="server"
          @on-play="onPlayHandler(server.id)"
          @on-delete="onDeleteHandler(server.id)"
          @on-export="onExportHandler(server.id)"
          @on-edit="onEditHandler(server.id)"
          @on-refresh="onRefreshHandler(server.id)"
        />
      </swiper-slide>
    </swiper>
    <transition name="swiper-container-control">
      <button
        class="swiper-container-control swiper-container-control-left"
        v-if="swiperControlStatus.allowPrev"
        @click="SwiperRef!.slidePrev()"
      >
        <m-svg-icon
          class="icon"
          name="swiper-prev"
          color="black"
        />
      </button>
    </transition>

    <transition name="swiper-container-control">
      <button
        class="swiper-container-control swiper-container-control-right"
        v-if="swiperControlStatus.allowNext"
        @click="SwiperRef!.slideNext()"
      >
        <m-svg-icon
          class="icon"
          name="swiper-next"
          color="black"
        />
      </button>
    </transition>
  </div>
</template>

<style lang="scss">
.swiper-container {
  position: relative;

  &-items {
    width: 357px;
    height: 368px;
  }

  &-control {
    position: absolute;
    z-index: 100;

    display: flex;
    align-items: center;

    top: 22.4%;
    width: 54px;
    height: 46px;
    background-color: transparent;

    cursor: pointer;
    transition:
      background-color 0.1s;

    .icon {
      width: 30px;
      height: 30px;
      margin: 0 10px;
      opacity: 0.14;
      transition: opacity 0.6s;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);

      .icon {
        opacity: 0.6 !important;
      }
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &-left {
      left: 0px;
      border-radius: 0 50px 50px 0;

      .icon {
        margin-left: auto;
      }
    }

    &-right {
      right: 0px;
      border-radius: 50px 0 0 50px;

      .icon {
        margin-right: auto;
      }
    }
  }
}

.swiper-slide {
  border-radius: 10px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0);

  &-shadow {
    background: rgba(0, 0, 0, .1) !important;
  }

  &.swiper-slide-active {
    box-shadow: 0 6px 40px rgba(0, 0, 0, 0.06);
    background-color: white;
  }

  &.swiper-slide-prev,
  &.swiper-slide-next {
    box-shadow: 0 6px 40px rgba(0, 0, 0, 0.04);

    .swiper-slide-shadow {
      background: rgba(0, 0, 0, .08) !important;
    }
  }
}

.swiper-container:hover .swiper-container-control {
  .icon {
    opacity: 0.4;
    transition: opacity 0.1s;
  }
}


.swiper-container-control-enter-from,
.swiper-container-control-leave-to {
  opacity: 0;
  visibility: hidden;
}

.swiper-container-control-enter-to,
.swiper-container-control-leave-from {
  opacity: 1;
  visibility: visible;
}

.swiper-container-control-enter-active,
.swiper-container-control-leave-active {
  transition:
    background-color 0.1s,
    opacity 0.2s,
    visibility 0.2s;
}
</style>