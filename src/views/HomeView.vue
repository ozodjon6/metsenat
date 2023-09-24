<template>
  <Header/>
  <div class="control-header py-6">
    <div class="container mx-auto">
      <div class="control-header__inner flex items-center justify-between">
        <div class="tab-buttons flex items-center justify-between rounded-md">
          <button
              class="tab-buttons__btn py-4 flex items-center justify-center w-full"
              :class="{active: activeTab === tab}"
              v-for="tab in tabs"
              :key="tab"
              @click="activateTab(tab)"
          >{{ tab }}
          </button>
        </div>
        <div class="control-header__panel flex items-center">
          <div class="search-panel mr-5">
            <input type="search" class="search-panel__input" placeholder="Izlash">
          </div>
          <div class="filter-panel flex items-center py-2 px-8">
            <svg class="icon mr-3" width="16" height="16">
              <use xlink:href="@/assets/icons/sprite.svg#filter"></use>
            </svg>
            <span>Filter</span>
          </div>
        </div>
      </div>
      <Tabs>
        <template v-for="tab in tabs" :key="tab" :slot="tab">
          <div v-if="activeTab === tab">
            <h2>{{ tab }}</h2>
            <p>This is the content for {{ tab }}.</p>
          </div>
        </template>
      </Tabs>
    </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue";
import Tabs from '@/components/Tabs.vue';

export default defineComponent({
  name: "HomeView",
  components: {
    Header, Tabs
  },
  data() {
    return {
      activeTab: 'Dashboard',
      tabs: ['Dashboard', 'Homiylar', 'Talabalar']
    };
  },
  methods: {
    activateTab(tab: string) {
      this.activeTab = tab;
    },
  },
})

</script>

<style scoped lang="scss">

.control-header {
  background: #fff9;
}

.tab-buttons {
  box-shadow: inset 0px 0px 0px 2px #E0E7FF;
  max-width: 50%;
  flex: 0 0 50%;
  width: 100%;

  .tab-buttons__btn {
    font-size: 12px;
    color: rgba(51, 102, 255, 0.60);
    font-weight: 500;
    &.active {
      background: #36F;
      color: #FFF;

      &:first-child {
        border-right-color: #36F;
      }
      &:last-child {
        border-left-color: #36F;
      }
    }
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border-right: 2px solid #E0E7FF;
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-left: 2px solid #E0E7FF;
    }
  }
}

.control-header__panel {
  max-width: 50%;
  flex: 0 0 50%;
  width: 100%;
  justify-content: end;

  svg {
    width: 16px;
    height: 16px;
    fill: rgba(51, 102, 255, 0.60);
  }
}

.search-panel {
  width: 100%;
  max-width: 284px;

  .search-panel__input {
    background: #E8E8E8;
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    max-width: 284px;
    font-weight: 400;
    font-size: 15px;
  }
}

.filter-panel {
  border-radius: 5px;
  background: #EDF1FD;
}


</style>
