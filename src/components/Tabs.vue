<template>
  <div>
    <div class="tab-header">
      <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activateTab(tab)"
          :class="{ active: activeTab === tab }"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch} from 'vue';

export default defineComponent({
  name: 'Tabs',
  setup() {
    const activeTab = ref('');
    const tabs = ref<string[]>([]);

    const activateTab = (tab: string) => {
      activeTab.value = tab;
    };

    return {
      activeTab,
      activateTab,
      tabs,
    };
  },
});
</script>















<style scoped>
.tab-header {
  display: flex;
  gap: 10px;
}

.tab-header button {
  background-color: #f2f2f2;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.tab-header button.active {
  background-color: #ddd;
}

.tab-content {
  margin-top: 10px;
}
</style>
