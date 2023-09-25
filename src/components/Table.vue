<template>
  <div>
    <table>
      <thead>
      <tr>
        <th v-for="column in columns" :key="column">
          {{ column.toUpperCase() }}
        </th>
      </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  props: {
    data: Array as () => any[],
    columns: Array as () => string[],
    itemsPerPage: Number,
  },
  setup(props) {
    const currentPage = ref(1);
    const isDropdownOpen = ref(false);

    const totalPages = computed(() => Math.ceil(props.data.length / props.itemsPerPage));

    const paginatedData = computed(() => {
      const startIndex = (currentPage.value - 1) * props.itemsPerPage;
      const endIndex = startIndex + props.itemsPerPage;
      return props.data.slice(startIndex, endIndex);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const visiblePages = computed(() => {
      const pageCount = totalPages.value;
      if (pageCount <= 5) {
        return Array.from({ length: pageCount }, (_, i) => i + 1);
      } else {
        const currentPageValue = currentPage.value;
        const pages = [1, 2];
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
      const pageCount = totalPages.value;
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    });

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const gotoPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        isDropdownOpen.value = false;
      }
    };

    return {
      currentPage,
      isDropdownOpen,
      totalPages,
      paginatedData,
      nextPage,
      prevPage,
      visiblePages,
      gotoPage,
      totalPageOptions,
      toggleDropdown
    };
  },
});
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
}

thead tr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;

  th {
    color: #B1B1B8;
    width: 100%;
    font-size: 12px;

    &:first-child {
      width: 100%;
      max-width: 56px;
    }
  }
}


tbody tr {
  margin-bottom: 12px;
  display: block;
  border-radius: 8px;
  border: 1px solid rgba(46, 91, 255, 0.08);
  background: #FFF;
  width: 100%;
}

td {
  padding: 22px;
  text-align: left;
  width: 100%;
}

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
