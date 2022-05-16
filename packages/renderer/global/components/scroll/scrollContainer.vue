

<script setup lang="ts">
import { onMounted, nextTick, ref, reactive, computed } from 'vue';
const scrollRootContainer = ref<HTMLElement | null>(null);
const scrollRootContainerRender = computed(() => scrollRootContainer.value!);
const scrollProps = defineProps<{
  disabledBlur?: boolean,
}>()
const scroll = reactive({
  style: {
    hideTop: false,
    hideBottom: false,
    hideAll: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    scrollPadding: 6,
    contentHeight: 0,
    containerHeight: 0
  },
  mouse: {
    startMousePositionY: 0
  }
})


onMounted(() => {
  const scrollContent = scrollRootContainerRender.value.querySelector('._scroll-container-content') as HTMLDivElement;
  const scrollStyleCheckerCall = () => {
    const divContainer = scrollRootContainerRender.value as HTMLDivElement;
    const divContent = scrollContent;
    const scrollPadding = scroll.style.scrollPadding;

    const scrollTop = divContainer.scrollTop;
    const containerHeight = divContainer.offsetHeight;
    const contentHeight = divContent.scrollHeight < containerHeight ? containerHeight : divContent.scrollHeight;
    const scrollBarContainerHeight = (containerHeight - scrollPadding * 2);

    const onTop = scrollTop === 0;
    const onBottom = scrollTop + containerHeight === contentHeight;
    const scrollBarHeight = containerHeight / contentHeight * scrollBarContainerHeight;
    const scrollBarTop = scrollTop / contentHeight * scrollBarContainerHeight;


    scroll.style = {
      ...scroll.style,
      hideTop: onTop && !onBottom,
      hideBottom: onBottom && !onTop,
      hideAll: !onBottom && !onTop,
      scrollBarHeight,
      scrollBarTop,
      contentHeight,
      containerHeight
    }
  }

  scrollRootContainerRender.value.addEventListener('scroll', scrollStyleCheckerCall);

  // dom 发生变化
  const observer = new MutationObserver(scrollStyleCheckerCall);
  observer.observe(scrollContent, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
  });

  nextTick(() => {
    scrollStyleCheckerCall();
  })
})


const handleSrcollbarMouseDown = (ev: MouseEvent) => {
  const mousePositionY = ev.clientY;
  const scrollContainer = scrollRootContainerRender.value;
  const scrollPadding = scroll.style.scrollPadding;

  scroll.mouse.startMousePositionY =
    mousePositionY - scrollContainer.offsetTop - scrollPadding - scroll.style.scrollBarTop;

  window.addEventListener('mousemove', handleSrcollbarMouseMove);
  window.addEventListener('mouseup', handleSrcollbarMouseUp);
}

const handleSrcollbarMouseUp = () => {
  window.removeEventListener('mousemove', handleSrcollbarMouseMove);
  window.removeEventListener('mouseup', handleSrcollbarMouseUp);
}

const handleSrcollbarMouseMove = (ev: MouseEvent) => {
  const mousePositionY = ev.clientY;
  const { scrollPadding, contentHeight, containerHeight } = scroll.style;
  const scrollContainer = scrollRootContainerRender.value;
  const scrollContainerHeight = (containerHeight - scrollPadding * 2);
  const readyScrollTop =
    mousePositionY - scrollContainer.offsetTop - scrollPadding - scroll.mouse.startMousePositionY;

  const scrollTopRate = readyScrollTop / scrollContainerHeight;
  const rate = scrollTopRate < 0 ? 0 : scrollTopRate > 1 ? 1 : scrollTopRate;
  scrollTo({
    top: rate * contentHeight,
  })
}

function scrollTo(option: ScrollToOptions) {
  if (scrollRootContainerRender.value) scrollRootContainerRender.value.scrollTo(option)
}

function target() {
  return scrollRootContainerRender.value;
}

defineExpose({
  scrollTo,
  target
})

</script>

<template>
  <div
    class="_scroll"
    ref="scrollRoot"
  >
    <div
      class="_scroll-container"
      ref="scrollRootContainer"
      :class="{
        'hide-bottom': scroll.style.hideBottom,
        'hide-top': scroll.style.hideTop,
        'hide-all': scroll.style.hideAll,
        'blur': !scrollProps.disabledBlur
      }"
    >
      <div class="_scroll-container-content">
        <slot />
      </div>
    </div>
    <div
      class="_scroll-bar"
      v-if="scroll.style.contentHeight > scroll.style.containerHeight"
    >
      <div
        class="_scroll-bar-control"
        :style="{ 'height': `${scroll.style.scrollBarHeight}px`, 'top': `${scroll.style.scrollBarTop}px` }"
        @mousedown="handleSrcollbarMouseDown"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
._scroll {
  position: relative;

  &:hover ._scroll-bar {
    &-control {
      background: rgba(0, 0, 0, 0.08);
      transition: background 0.15s;
    }
  }

  & &-bar {
    position: absolute;
    box-sizing: border-box;
    width: 4px;
    top: 6px;
    right: 6px;
    bottom: 6px;
    overflow: hidden;

    &-control {
      position: absolute;
      width: 100%;
      // min-height: 48px; 
      border-radius: 4px;
      background: rgba(0, 0, 0, 0);
      transition: background 1s;

      &:hover {
        background: rgba(0, 0, 0, 0.16);
      }

      &:active {
        background-color: #4B69FF;
      }
    }
  }


  &-container {
    height: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;

    &-content {
      height: 0;
    }

    &-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 200px;
      width: 5px;
      background-color: var(--window-scroll-bar-color);
    }

    &.blur.hide-top {
      -webkit-mask-image: -webkit-linear-gradient(#000 97%, transparent);
    }

    &.blur.hide-bottom {
      -webkit-mask-image: -webkit-linear-gradient(transparent, #000 3%);
    }

    &.blur.hide-all {
      -webkit-mask-image: -webkit-linear-gradient(transparent,
          #000 3%,
          #000 97%,
          transparent);
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
