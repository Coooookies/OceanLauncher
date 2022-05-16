<script setup lang="ts">
import { computed } from '@vue/reactivity';


const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return `svg-icon`
})

</script>
 <!--  -->
<template>
  <svg
    :class="svgClass"
    v-bind="$attrs"
  >
    <use
      :xlink:href="iconName"
      :style="{ color: props.color, fill: props.color }"
    />
  </svg>
</template>
 
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
