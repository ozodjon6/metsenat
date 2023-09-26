<template>
  <h2>Результаты поиска:</h2>
  <ul>
    <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
  </ul>
  <Tabs>
    <template v-for="tab in tabs" :key="tab" :slot="tab">
      <div v-if="activeTab === tab">
        <Table :data="items" :columns="tableColumns" :itemsPerPage="itemsPerPage">
          <tr v-for="item in items" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.full_name}}</td>
            <td>
              <span class="phone-number">{{item.phone}}</span>
            </td>
            <td>
              {{item.sum.toLocaleString().replaceAll(',', ' ')}}
              <span class="currency-unit">UZS</span>
            </td>
            <td>
              {{item.spent}}
              <span class="currency-unit">UZS</span>
            </td>
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
</template>
<script lang="ts">
import {defineComponent, onMounted, ref, computed, watch} from 'vue'
import Pagination from "@/components/Pagination.vue";
import Tabs from "@/components/Tabs.vue";
import Table from "@/components/Table.vue";
import {useItemsStore} from '@/store/sponser-list';
import {statusSponsors} from '@/helpers/statusSponsor'
import {useAuthStore} from '@/store/auth';
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
import {useSearchStore} from '@/store/searchTerm'

export default defineComponent({
  name: 'sponsors',
  components: {
    Tabs, Table, Pagination
  },
  setup() {
    const itemsStore = useItemsStore();
    const searchStore = useSearchStore();
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

    const fetchDataAfterLogin = async (url:string, page:number) => {
      if (authStore.isAuthenticated) {
        await itemsStore.fetchDataList(url, page);
        items.value = itemsStore.items;
      }
    };

    const searchResults = computed(() => {
      const searchTerm = searchStore.searchTerm.toLowerCase();
      return items.value.filter((item: any) => {
        item.full_name.toLowerCase().includes(searchTerm) || item.phone.toLowerCase().includes(searchTerm)
      })
    })

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
      searchResults,
      currentPage,
      activeTab,
      tabs,
      tableColumns,
      itemsPerPage,
      totalPages,
      statusSponsors,
      authStore,
    }

  }
});
</script>

<style scoped lang="scss">
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
  padding: 22px 12px;
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

  .phone-number {
    color: #1D1D1F;
    font-size: 14px;
    font-weight: 400;
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

  &:nth-child(2) {
    display: block;
    max-width: 222px;
    width: 100%;
    flex: 0 0 100%;
    text-align: left;
  }

}
</style>