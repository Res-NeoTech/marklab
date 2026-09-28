import { defineStore } from 'pinia';

export const useDocumentStore = defineStore('document', {
	state: () => ({
		title: 'New Document',
		markdown: '',
	}),
});
