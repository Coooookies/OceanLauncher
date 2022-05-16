<script lang="ts" setup>
import { MSvgIcon } from '@/global/components/svgIcon';
import { useGameStore } from '@main/store/gameStore';

const emits = defineEmits<{
  (e: 'onEdit', id: string): void,
  (e: 'onDelete', id: string): void,
}>()

const GameStore = useGameStore();
</script>

<template>
  <ul
    class="game-manager"
    v-if="GameStore.clients.length > 0"
  >
    <li
      class="game-manager-item"
      v-for="client in GameStore.clients"
    >
      <span
        class="game-manager-item-version"
        v-text="client.available ? client.version : $t('game.edit.unavailable')"
      />
      <span
        class="game-manager-item-remark"
        v-text="client.remark"
      />
      <div class="game-manager-item-action">
        <button
          class="_action_button"
          @click="emits('onEdit', client.id)"
        >
          <m-svg-icon
            class="_action_button-icon"
            name="context-edit"
            color="rgba(0, 0, 0, 0.5)"
          />
        </button>
        <button
          class="_action_button"
          @click="emits('onDelete', client.id)"
        >
          <m-svg-icon
            class="_action_button-icon"
            name="context-delete"
            color="#FF5757"
          />
        </button>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.game-manager {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 4px;

  & &-item {
    height: 42px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
    cursor: pointer;

    &-version {
      color: rgba(0, 0, 0, 0.7);
      width: 76px;
    }

    &-remark {
      color: rgba(0, 0, 0, 0.3);
      flex: 1;
    }

    &-version,
    &-remark {
      font-size: 13px;
      font-weight: 600;
    }

    &-action {
      display: flex;
      flex-direction: row;
      opacity: 0;

      ._action_button {
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        width: 26px;
        height: 26px;
        margin-right: 4px;
        opacity: 1;
        transition: opacity 0.2s;

        &:last-child {
          margin-right: 0;
        }

        &-icon {
          width: 20px;
          height: 20px;
        }

        &:hover {
          opacity: 0.7;
        }
      }
    }

    &:hover {
      background-color: white;

      .game-manager-item-action {
        opacity: 1;
      }
    }
  }
}
</style>