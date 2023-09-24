import { defineStore } from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('store', {
    state: () => ({
        isLoading: false,
        user: null,
        errors: null,
        isLoggedIn: null,
        reCaptchaResponse: '',
    }),
    actions: {
        login: (context: any, value: any) => {
            return new Promise((resolve, reject) => {
                axios.post('https://club.metsenat.uz/api/v1/auth/login/')
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch(error => {
                         console.log(error);
                         reject(error);
                     })
            })
        }
    },
})