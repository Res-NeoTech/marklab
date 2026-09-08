<script setup lang="ts">
import type { SplitterItem } from '@nuxt/ui'
import { useMarkdownStore } from '~/stores/useMarkdownStore';

const markdownStore = useMarkdownStore();
const markdown = ref<string>(markdownStore.markdown);

watch(markdown, (newVal) => {
    markdownStore.markdown = newVal;
});

const splitterItems: SplitterItem[] = [
    { slot: 'left', minSize: 20, defaultSize: 50, class: 'items-center justify-center text-muted font-medium' },
    { slot: 'right', minSize: 20, defaultSize: 50, class: 'items-center justify-center text-muted font-medium' }
]
</script>

<template>
    <div class="w-full h-250">
        <USplitter id="splitter-custom-handle-example" :items="splitterItems" :ui="{
            handle:
                'data-[orientation=horizontal]:w-px data-[orientation=vertical]:h-px bg-border transition-colors data-[state=hover]:bg-primary data-[state=drag]:bg-primary'
        }" class="rounded-lg border border-default overflow-hidden">
            <template #left>
                <textarea class="w-full h-full resize-none border-0 outline-none bg-transparent p-4"
                    placeholder="Start typing..." v-model="markdown" />
            </template>

            <template #right>
                <div class="w-full h-full overflow-auto p-4">
                    <MDC :value="markdown" tag="article" />
                </div>
            </template>
        </USplitter>
    </div>
</template>