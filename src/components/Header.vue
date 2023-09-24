<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Header"
})
</script>

<template>

  <header class="w-full bg-white py-3">
    <div class="container mx-auto flex items-center justify-between">
      <svg class="icon" width="172" height="24">
        <use xlink:href="@/assets/icons/sprite.svg#logo-pro"></use>
      </svg>
      <div class="flex items-center justify-center">
        <div class="person flex items-center justify-between py-1 pr-1 pl-5 mr-10">
          <div class="person__name font-SfProDisplay font-bold">Shohrux</div>
          <div class="person__icon ml-6">
            <svg class="icon" width="24" height="24">
              <use xlink:href="@/assets/icons/sprite.svg#person"></use>
            </svg>
          </div>
        </div>
        <svg class="icon" width="32" height="32">
          <use xlink:href="@/assets/icons/sprite.svg#log-out"></use>
        </svg>
      </div>
    </div>
  </header>

</template>

<style scoped lang="scss">

header {
  box-shadow: 0px 25px 40px 0px rgba(0, 0, 0, 0.03);
  background-color: #fff;
  flex-shrink: 0;
}
.person {
  border-radius: 6px;
  background: #F1F1F3;

  .person__name {
    font-size: 13px;
    color: var(--dark-dark-400, #28293D);
  }

  .person__icon {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background: #00AE69;
    position: relative;

    svg {
      position: absolute;
      bottom: 0;
      left: 4px;
    }
  }
}

</style>