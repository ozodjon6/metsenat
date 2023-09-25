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
            <Table :data="items" :columns="tableColumns" :itemsPerPage="itemsPerPage">
              <tr v-for="item in items" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.full_name}}</td>
                <td>{{item.phone}}</td>
                <td>
                  {{item.sum.toLocaleString().replaceAll(',', ' ')}}
                  <span class="currency-unit">UZS</span>
                </td>
                <td>{{item.spent}}</td>
                <td>{{new Date(item.created_at).toLocaleDateString('de-DE').replaceAll('.', '-')}}</td>
                <td>
                  <span
                      :class="statusSponsors(item.get_status_display)"
                      class="status"
                  >{{item.get_status_display}}</span>
                </td>
                <td>
                  <svg class="icon flex-shrink-0" width="24" height="24">
                    <use xlink:href="@/assets/icons/sprite.svg#eye"></use>
                  </svg>
                </td>
              </tr>
            </Table>
            <Pagination
                :data="items"
                :current-page="currentPage"
                :total-pages="totalPages"
                :itemsPerPage="10"
            />
          </div>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, computed, watch} from 'vue'
import Header from "@/components/Header.vue";
import Tabs from '@/components/Tabs.vue';
import Table from "@/components/Table.vue";
import Pagination from "@/components/Pagination.vue";
import {useItemsStore} from '@/store/sponser-list';
import {useAuthStore} from '@/store/auth';
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: "HomeView",
  components: {
    Header, Tabs, Table, Pagination
  },
  setup() {
    const itemsStore = useItemsStore();
    const { items, meta } = storeToRefs(itemsStore)
    const currentPage = ref(1);
    const totalPages = computed(() => Math.floor(meta.value.count / 10));
    const authStore = useAuthStore();
    const activeTab = ref('Homiylar')
    const tabs = ['Dashboard', 'Homiylar', 'Talabalar']
    const tableColumns = [
        '#', 'F.I.SH.', 'Tel.Raqami', 'Homiylik summasi', 'Sarflangan summa', 'Sana', 'Holati', 'Amallar'
    ]
    const itemsPerPage = ref(10);
    const route = useRoute();
    const currentQueryPage = ref(route.query.page);
    const activateTab = (tab: string) => {
      activeTab.value = tab;
    };

    const statusSponsors = (status: string) => {
      if (status === 'Yangi') {
        return 'new-text'
      } else if (status === 'Moderatsiyada') {
        return 'in-moderation-text'
      } else if (status === 'Bekor qilingan') {
        return 'canceled-text'
      } else {
        return 'confirmed-text'
      }
    };

    const fetchDataAfterLogin = async (url:string, page:number) => {
      if (authStore.isAuthenticated) {
        await itemsStore.fetchDataList(url, page);
        items.value = itemsStore.items;
      }
    };

    onMounted(() => {
      const routeQueryPage = route.query.page;
      fetchDataAfterLogin('sponsor-list',routeQueryPage ? Number(routeQueryPage) : 1);
    });

    watch(() => route.query.page, async (newPage, oldPage) => {
      await fetchDataAfterLogin('sponsor-list',Number(newPage));
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
      totalPages,
      statusSponsors
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

tbody tr {
  margin-bottom: 12px;
  display: flex;
  border-radius: 8px;
  border: 1px solid rgba(46, 91, 255, 0.08);
  background: #FFF;
  width: 100%;
}

td {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  text-align: center;
  width: 100%;
  color: #1D1D1F;
  font-size: 14px;

  .status {
    color: #5BABF2;
    font-size: 15px;
    font-weight: 400;

    &.new-text {
      color: #5BABF2;
    }
    &.in-moderation-text {
      color: #FFA445;
    }
    &.canceled-text {
      color: #979797;
    }
    &.confirmed-text {
      color: #00CF83;
    }
  }

  .currency-unit {
    color: #B2B7C1;
    display: block;
    margin-left: 4px;
  }

  &:first-child {
    width: 100%;
    max-width: 56px;
  }

}


</style>
