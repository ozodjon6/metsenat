<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    // Проверяем состояние аутентификации в localStorage при загрузке страницы
    onMounted(() => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      authStore.setIsAuthenticated(isAuthenticated);
    });

    return {};
  },
});
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
