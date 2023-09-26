import { defineStore } from 'pinia';
import {ref} from "vue";

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchTerm: ref(''),
    }),
    actions: {
        updateSearchTerm(newTerm: string) {
            this.searchTerm = newTerm;
        },
    },
});