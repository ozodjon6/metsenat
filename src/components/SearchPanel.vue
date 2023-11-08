<template>
  <div class="flex items-center">
    <input
        class="rounded border w-full py-2 px-3 pl-9"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="search..." />
  </div>

</template>

<script lang="ts" setup>
import {ref} from 'vue'

const searchQuery = ref('');
const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', searchQuery.value)
}

</script>

<style scoped lang="scss">

</style>