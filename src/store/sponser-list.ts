import {defineStore} from 'pinia';
import axios from '@/service/axios';

export const useItemsStore = defineStore('items', {
    state: () => ({
        items: [] as Record<string, any>[],
        meta:{
            count: 0,
            next:null,
            previous:null,
        }
    }),
    actions: {
        async fetchDataList(url:string, page = 1) {
            try {
                const response = await axios.get(`/${url}/?page=${page}`)
                this.items = response.data.results
                this.meta = {
                    count: response.data.count,
                    next: response.data.next,
                    previous: response.data.previous
                }
            } catch (error) {
                console.error('Authentication error:', error);
                throw error
            }
        }
    },
});