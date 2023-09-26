<template>
  <div class="container mx-auto tab-content__bottom flex items-center justify-between mt-6">
    <span class="tab-content__info-text">{{ meta.count}} tadan 1-{{ itemsPerPage }} tasi ko`rsatilmoqda</span>
    <div class="pagination flex items-center">
      <div class="custom-select mr-5 flex items-center">
        <span class="tab-content__info-text block mr-3">Ko‘rsatish</span>
        <div class="selected-option" @click="toggleDropdown">
          <span class="block mr-1">{{ currentPage }}</span>
          <svg class="icon flex-shrink-0" width="16" height="16">
            <use xlink:href="@/assets/icons/sprite.svg#down"></use>
          </svg>
        </div>
        <ul class="dropdown-list" v-if="isDropdownOpen">
          <li v-for="(page, index) in totalPageOptions"
              :key="index"
              @click="gotoPage(Number(page))"
          >{{ page }}</li>
        </ul>
      </div>
      <button class="pagination__btn pagination__btn-prev" @click="prevPage(Number(currentPage - 1))" :disabled="currentPage === 1">
        <svg class="icon" width="24" height="24">
          <use xlink:href="@/assets/icons/sprite.svg#down"></use>
        </svg>
      </button>
      <template v-for="page in visiblePages" :key="page">
        <button class="pagination__btn" @click="gotoPage(Number(page))" :class="{ active: currentPage === page }">
          {{page}}
        </button>
      </template>
      <button class="pagination__btn pagination__btn-next" @click="nextPage(Number(currentPage + 1))" :disabled="currentPage === totalPages">
        <svg class="icon" width="24" height="24">
          <use xlink:href="@/assets/icons/sprite.svg#down"></use>
        </svg>
      </button>
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useItemsStore} from "@/store/sponser-list";

export default defineComponent({
  name: "Pagination",
  props: {
    data: Array as () => any[],
    columns: Array as () => string[],
    currentPage: Number,
    totalPages: Number,
    itemsPerPage: Number,
  },
  setup(props) {
    const currentPage = ref(1);
    const isDropdownOpen = ref(false);
    const router = useRouter()
    const itemsStore = useItemsStore();
    const { meta } = storeToRefs(itemsStore)

    const nextPage = (page: number) => {
      if (currentPage.value < props?.totalPages) {
        currentPage.value++;
        router.push({query: {page: page}});
      }
    };

    const prevPage = (page: number) => {
      if (currentPage.value > 1) {
        currentPage.value--;
        router.push({query: {page: page}});
      }
    };

    const visiblePages = computed(() => {
      const pageCount: number | undefined = props?.totalPages;
      if (pageCount && pageCount <= 5) {
        return Array.from({ length: pageCount }, (_, i) => i + 1);
      } else {
        const currentPageValue: number = currentPage.value;
        const pages: (number | string)[] = [1, 2];
        if (currentPageValue <= 4) {
          for (let i = 3; i <= currentPageValue + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(pageCount - 1);
          pages.push(pageCount);
        } else if (currentPageValue >= pageCount - 3) {
          pages.push('...');
          for (let i = currentPageValue - 1; i < pageCount; i++) {
            pages.push(i);
          }
          pages.push(pageCount);
        } else {
          pages.push('...');
          for (let i = currentPageValue - 1; i <= currentPageValue + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(pageCount - 1);
          pages.push(pageCount);
        }
        return pages;
      }
    });

    const totalPageOptions = computed(() => {
      const pageCount = props?.totalPages;
      return Array.from({length: pageCount}, (_, i) => i + 1);
    });

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const gotoPage = (page: number) => {
      if (page >= 1 && page <= props?.totalPages) {
        router.push({query: {page: page}});
        currentPage.value = page;
        isDropdownOpen.value = false;
      }
    };

    return {
      currentPage,
      isDropdownOpen,
      totalPages: props?.totalPages,
      nextPage,
      prevPage,
      visiblePages,
      gotoPage,
      totalPageOptions,
      toggleDropdown,
      meta
    };
  },
})
</script>

<style scoped lang="scss">

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-content__info-text {
  color: #1D1D1F;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
}
.pagination  {
  .pagination__btn-prev,
  .pagination__btn-next {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pagination__btn-prev {
    transform: rotate(90deg);
  }
  .pagination__btn-next {
    transform: rotate(-90deg);
  }
  .pagination__btn {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    margin: 0 4px;
    cursor: pointer;
    border: 1px solid #DFE3E8;
    font-size: 14px;
    background-color: #fff;

    &.active {
      border-color: #36F;
      color: #36F;
    }

    &:disabled {
      opacity: 0.5;
      background: #DFE3E8;
    }
  }
}


.pagination button:disabled {
  cursor: not-allowed;
}

/* Добавьте стили для выпадающего списка */
.custom-select {
  position: relative;
}
.selected-option {
  width: 54px;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #DFE3E8;
  background: #FFF;
  color: #1D1D1F;
  position: relative;

  span {
    line-height: 22px;
    font-size: 15px;
    font-weight: 400;
  }
}

.dropdown-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  bottom: 100%;
  right: 0;
  display: block;
  border-radius: 4px;
  border: 1px solid #DFE3E8;;
  background-color: white;
  max-height: 150px; /* Максимальная высота выпадающего списка */
  overflow-y: auto; /* Добавьте вертикальную прокрутку при необходимости */
}

.dropdown-list li {
  padding: 5px 10px;
  cursor: pointer;
  width: 54px;
  height: 32px;

  &:not(:last-child) {
    border-bottom: 1px solid #DFE3E8;
  }
}

/* При наведении на элемент списка */
.dropdown-list li:hover {
  background-color: #f2f2f2;
}

/* Показываем выпадающий список */
.custom-select.active .dropdown-list {
  display: block;
}

</style>