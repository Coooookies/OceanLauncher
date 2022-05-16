<script lang="ts" setup>
import { MSvgIcon } from '@/global/components/svgIcon';

const durationLevel = [400, 120, 0];
const props = defineProps<{
  ping: number,
  content?: string
}>()
</script>

<template>
  <div class="server-status-network">
    <m-svg-icon
      name="server-network"
      class="icon"
      :color="(() => {
        if (props.ping !== -1) {
          if (props.ping >= durationLevel[0]) return '#E35757';
          else if (durationLevel[0] > props.ping && props.ping >= durationLevel[1]) return '#EC903C';
          else if (durationLevel[1] > props.ping && props.ping >= durationLevel[2]) return '#28BC87';
        } else {
          return 'rgba(0, 0, 0, 0.4)';
        }
      })()"
    />
    <span
      v-text="!!props.content ? props.content : props.ping === -1 ? '--' : `${props.ping}ms`"
      class="delay"
      :class="{
        'delay-high': props.ping >= durationLevel[0],
        'delay-middle': durationLevel[0] > props.ping! && props.ping >= durationLevel[1],
        'delay-low': durationLevel[1] > props.ping && props.ping >= durationLevel[2],
        'delay-none': props.ping === -1,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.server-status-network {
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 14px;
    height: 14px;
  }

  .delay {
    margin-left: 5px;
    color: #28BC87;
    font-size: 12px;
    font-weight: 500;


    &,
    &.delay-none {
      color: rgba(0, 0, 0, 0.4);
    }

    &.delay-high {
      color: #E35757;
    }

    &.delay-middle {
      color: #EC903C;
    }

    &.delay-low {
      color: #28BC87;
    }
  }
}
</style>