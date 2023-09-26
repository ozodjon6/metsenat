<template>
  <div class="container mx-auto flex flex-col items-center justify-center h-screen">
    <svg class="icon mb-12" width="315" height="33">
      <use xlink:href="@/assets/icons/sprite.svg#logo"></use>
    </svg>
    <div v-if="errorUser" class="error-message my-4 text-red-600">{{ errorUser }}</div>
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
      <vue-recaptcha
          ref="recaptcha"
          @verify="onRecaptchaVerified"
          :sitekey="recaptchaKey"
      ></vue-recaptcha>
      <button
          class="btn py-3 w-full flex items-center justify-center mt-5"
          type="submit"
          @click="submitHandler"
          :disabled="isLoginDisabled"
      >
        <template v-if="isLoading">
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </template>
        Kirish
      </button>
    </form>
  </div>

</template>

<script lang="ts">
import {defineComponent, ref, computed} from "vue";
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { VueRecaptcha } from 'vue-recaptcha';

export default defineComponent({
  name: 'Login',
  components: { VueRecaptcha },
  setup() {
    const authStore = useAuthStore();
    const isLoading = ref(false);
    const errorUser = ref<string | null>(null);
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const recaptchaResponse = ref('');

    const recaptchaKey = ref('6Ldb7lQoAAAAANSF6G79m80h7wTmab26XeazjBbm');

    const isLoginDisabled = computed(() => {
      return !username.value.length || !password.value.length || isLoading.value;
    })

    const onRecaptchaVerified = (response: string) => {
      recaptchaResponse.value = response;
    }

    const submitHandler = async () => {
      isLoading.value = true;
      errorUser.value = null;

      try {
        if (!recaptchaResponse.value) {
          await authStore.login(username.value, password.value);
          await router.push('/');
          localStorage.setItem('isAuthenticated', 'true');
        }
      } catch (error:any) {
        errorUser.value = error.response.data.detail;
      }

      isLoading.value = false;
    };

    return {
      isLoading,
      errorUser,
      username,
      password,
      submitHandler,
      isLoginDisabled,
      recaptchaKey,
      onRecaptchaVerified
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

    &:disabled {
      background-color: #2e5bff45;
    }
  }
}
</style>