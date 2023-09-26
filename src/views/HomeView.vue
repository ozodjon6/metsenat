<template>
  <div v-if="isAuthenticated">
    <Header/>
    <div class="control-header py-6 mb-12">
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
              <input
                  type="text"
                  v-model="searchTerm"
                  @input="handleInput"
                  class="search-panel__input" placeholder="Izlash">
            </div>
            <div
                class="filter-panel flex items-center py-2 px-8 cursor-pointer"
            >
              <svg class="icon mr-3" width="16" height="16">
                <use xlink:href="@/assets/icons/sprite.svg#filter"></use>
              </svg>
              <span>Filter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="control-content">
      <div class="container mx-auto">
        <Sponsors v-if="activeTab === 'Homiylar'"/>
        <Dashboard v-if="activeTab === 'Dashboard'"/>
        <Students v-if="activeTab === 'Talabalar'"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import Header from "@/components/Header.vue";
import Sponsors from "@/components/Sponsors.vue";
import Dashboard from "@/components/Dashboard.vue";
import Students from "@/components/Students.vue";
import {statusSponsors} from '@/helpers/statusSponsor'
import {useAuthStore} from '@/store/auth';
import {useSearchStore} from '@/store/searchTerm'
import router from "@/router";

export default defineComponent({
  name: "HomeView",
  components: {
    Header, Sponsors, Dashboard, Students
  },
  setup() {
    const authStore = useAuthStore();
    const activeTab = ref('Homiylar')
    const tabs = ['Dashboard', 'Homiylar', 'Talabalar']
    const searchTerm = ref('');
    const searchStore = useSearchStore();
    const activateTab = (tab: string) => {
      activeTab.value = tab;
    };

    const isAuthenticated = () => {
      if (!authStore.isAuthenticated) {
        router.push({name: 'login'})
      }
    }

    const handleInput = () => {
      searchStore.updateSearchTerm(searchTerm.value);
      console.log('Input changed:', searchTerm.value);
    }

    onMounted(() => {
      isAuthenticated();
    });


    return {
      activateTab,
      activeTab,
      tabs,
      searchTerm,
      statusSponsors,
      authStore,
      isAuthenticated,
      handleInput,
    }
  }
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
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    background: url('@/assets/icons/search.svg') no-repeat center center;
    background-size: 20px 20px;
  }

  .search-panel__input {
    background: #E8E8E8;
    width: 100%;
    border-radius: 5px;
    padding: 10px 10px 10px 38px;
    max-width: 284px;
    font-weight: 400;
    font-size: 15px;
    color: #1D1D1F;
  }
}

.filter-panel {
  border-radius: 5px;
  background: #EDF1FD;
}


</style>
