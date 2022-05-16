<script lang="ts" setup>
import { useGamaManager } from '@main/hook/useGamaManager';
import { MDialogWrapper } from '@/global/components/wrapper';
import { MLoaderCyl } from '@/global/components/loader';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const router = useRouter();
const GameManager = useGamaManager();
const GameStatusRef = reactive({
  visible: false
})

GameManager.on('spawn', () => {
  router.push({ name: 'Launch' });
  GameStatusRef.visible = false;
});

GameManager.on('load', () => GameStatusRef.visible = true);
GameManager.on('crash', () => GameStatusRef.visible = false);
GameManager.on('close', () => router.push({ name: 'Main' }));

</script>

<template>
  <m-dialog-wrapper
    :disabledCancel="true"
    v-model:visible="GameStatusRef.visible"
  >
    <div class="game-launching-dialog">
      <m-loader-cyl class="game-launching-dialog_loader" />
      <p
        class="game-launching-dialog_text"
        v-text="$t('launch.client.loading')"
      />
    </div>
  </m-dialog-wrapper>
</template>

<style lang="scss" scoped>
.game-launching-dialog {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  height: 64px;

  & &_loader {
    width: 32px;
    height: 32px;
  }

  & &_text {
    font-size: 14px;
    margin-left: 12px;
  }
}
</style>