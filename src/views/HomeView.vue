<template>
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
            <input type="search" class="search-panel__input" placeholder="Izlash">
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
      <Tabs>
        <template v-for="tab in tabs" :key="tab" :slot="tab">
          <div v-if="activeTab === tab">
            <Table :data="tabsTotal" :columns="tableColumns" :itemsPerPage="itemsPerPage"/>
<!--            <Pagination :data="tabs" :current-page="currentPage" :total-pages="tableColumns.length"/>-->
          </div>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, computed} from 'vue'
import Header from "@/components/Header.vue";
import Tabs from '@/components/Tabs.vue';
import Table from "@/components/Table.vue";
import Pagination from "@/components/Pagination.vue";
import {useItemsStore} from '@/store/sponser-list';
import {useAuthStore} from '@/store/auth';

export default defineComponent({
  name: "HomeView",
  components: {
    Header, Tabs, Table, Pagination
  },
  setup() {
    const itemsStore = useItemsStore();
    const items = ref([] as any[]);
    const currentPage = ref(1);
    const authStore = useAuthStore();
    const activeTab = ref('Dashboard')
    const tabs = ['Dashboard', 'Homiylar', 'Talabalar']
    const tableColumns = [
        '#', 'F.I.SH.', 'Tel.Raqami', 'Homiylik summasi', 'Sarflangan summa', 'Sana', 'Holati', 'Amallar'
    ]
    const tabsTotal = [
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
      { id: 1, name: 'Ozodbek', jobs: 'Dev', body: 'some text'},
    ]
    const itemsPerPage = ref(10)
    const activateTab = (tab: string) => {
      activeTab.value = tab;
    };

    const fetchDataAfterLogin = async () => {
      if (authStore.isAuthenticated) {
        const savedData = localStorage.getItem('itemsData');
        const savedAuthenticated = localStorage.getItem('isAuthenticated');
        if (savedData && savedAuthenticated) {
          items.value = JSON.parse(savedData);
        } else {
          await itemsStore.fetchDataList();
          items.value = itemsStore.items
          localStorage.setItem('itemsData', JSON.stringify(items.value))
        }
      }

      console.log(items.value)
    };

    onMounted(() => {
      fetchDataAfterLogin();
    })

    return {
      items,
      itemsStore,
      currentPage,
      activateTab,
      activeTab,
      tabs,
      tableColumns,
      itemsPerPage,
      tabsTotal
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
    color: #B1B1B8;
  }
}

.filter-panel {
  border-radius: 5px;
  background: #EDF1FD;
}


</style>
