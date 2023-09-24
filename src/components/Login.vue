<template>
  <div class="container mx-auto flex flex-col items-center justify-center h-screen">
    <svg class="icon mb-12" width="315" height="33">
      <use xlink:href="@/assets/icons/sprite.svg#logo"></use>
    </svg>
    <form class="text-center form-wrap px-8 py-8" @submit.prevent>
      <div class="form-wrap__title text-left mb-11 text-2xl font-SfProDisplay font-bold">Kirish</div>
      <label class="mb-4 block max-w-3xl">
        <span class="form-wrap__label block mb-2 text-left">LOGIN</span>
        <input v-model="username" class="form-wrap__input w-full py-3 px-4 transition rounded" type="text" placeholder="adm8904">
      </label>
      <label class="mb-4 block max-w-3xl">
        <span class="form-wrap__label block mb-2 text-left">PAROL</span>
        <input v-model="password" class="form-wrap__input w-full py-3 px-4 transition rounded" type="password" placeholder="••••••••••">
      </label>
      <button class="btn py-3 w-full" type="submit" @click="submitHandler">Kirish</button>
    </form>
  </div>

</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useUserStore} from "@/store/auth"

export default defineComponent({
  name: 'Login',
  components: {},
  setup() {
    const username = ref('');
    const password = ref('');

    const userStore = useUserStore();

    const submitHandler = async () => {

      return await userStore.login(username.value, password.value);
    }

    return {
      username,
      password,
      submitHandler,
    }
  }
})


</script>

<style scoped lang="scss">
.form-wrap {
  max-width: 379px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #EBEEFC;
  background: #FFF;
  box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.03);

  .form-wrap__label {
    color: #1D1D1F;
    font-weight: 500;
    font-size: 12px;
  }

  .form-wrap__input {
    border-radius: 6px;
    box-shadow: inset 0 0 0 1px #E0E7FF;
    background: rgba(224, 231, 255, 0.20);
    color: #1D1D1F;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
  }

  .btn {
    border-radius: 6px;
    background: #2E5BFF;
    color: #FFF;
  }
}
</style>