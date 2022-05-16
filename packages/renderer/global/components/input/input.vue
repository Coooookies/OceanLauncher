<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'update:value', value: string): void,
  (e: 'update:error', value: boolean): void
}>();

const props = defineProps<{
  type?: 'text' | 'password',
  value: string,
  placeholder?: string,
  disabled?: boolean,
  spellcheck?: boolean,
  error?: boolean
}>()

const inputHandler = (e: Event) => {
  emits('update:value', (e.target as HTMLInputElement).value);

  if (typeof props.error === 'boolean') {
    emits('update:error', false);
  }
}
</script>

<template>
  <input
    class="m-input"
    :class="{ '_error': !!props.error }"
    :type="props.type ? props.type : 'text'"
    :value="props.value"
    :disabled="!!props.disabled"
    :placeholder="props.placeholder ? props.placeholder : ''"
    :spellcheck="!!props.spellcheck"
    @input="inputHandler"
  />
</template>

<style lang="scss" scoped>
.m-input {
  height: 38px;
  padding: 0 13px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 0px #4B69FF;
  min-width: 76px;
  transition: box-shadow 0.2s, background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }

  &:focus {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 2px #4B69FF;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }

  &::selection {
    background-color: #4B69FF;
    color: white;
  }

  &._error {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 2px #ff4b4b;
  }
}
</style>