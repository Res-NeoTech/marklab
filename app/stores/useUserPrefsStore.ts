import { defineStore } from 'pinia';

export const useUserPrefsStore = defineStore('userPrefs', {
	state: () => ({
		layoutPref: 'left',
	}),

	persist: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
    },
});