import {defineStore} from 'pinia';
import axios from '@/service/axios';

export const useItemsStore = defineStore('items', {
    state: () => ({
        items: [] as any[]
    }),
    actions: {
        async fetchDataList() {
            try {
                const response = await axios.get('/sponsor-list/')
                this.items = response.data
            } catch (error) {
                console.error('Authentication error:', error);
                throw error
            }
        }
    },
});