import { defineStore } from 'pinia';

export const JwtStore = defineStore('JwtStore', {
    state: () => ({
        jwt: null
    })
});
