import { defineStore } from 'pinia';

export const useMarkdownStore = defineStore('markdown', {
	state: () => ({
		markdown: null as unknown as string,
	}),
});