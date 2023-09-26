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
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    columns: Array as () => string[],
  },
  setup() {

    return {
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

    &:nth-child(2) {
      padding: 0 22px;
      display: block;
      max-width: 222px;
      width: 100%;
      text-align: left;
      flex: 0 0 100%;
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
  padding: 22px 12px;
  text-align: left;
  width: 100%;
}

</style>
