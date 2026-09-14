<script setup lang="ts">
import type { SplitterItem } from '@nuxt/ui'
import { useMarkdownStore } from '~/stores/useMarkdownStore';

const markdownStore = useMarkdownStore();
const markdown = ref<string>(markdownStore.markdown);

watch(markdown, (newVal) => {
    markdownStore.markdown = newVal;
    nextTick(resizeTextarea)
});

onMounted(() => {
    resizeTextarea()
})

const textarea = ref<HTMLTextAreaElement | null>(null)

const resizeTextarea = () => {
    requestAnimationFrame(() => {
        if (!textarea.value) return

        const scrollX = window.scrollX
        const scrollY = window.scrollY

        textarea.value.style.height = 'auto'
        textarea.value.style.height = `${textarea.value.scrollHeight}px`

        window.scrollTo(scrollX, scrollY)
    })
}

const splitterItems: SplitterItem[] = [
    { slot: 'left', minSize: 20, defaultSize: 50, class: 'text-muted font-medium' },
    { slot: 'right', minSize: 20, defaultSize: 50, class: 'text-muted font-medium' }
]
</script>

<template>

    <div class="w-full min-h-250">
        <USplitter id="splitter-custom-handle-example" :items="splitterItems" @resize="resizeTextarea" :ui="{
            handle:
                'data-[orientation=horizontal]:w-px data-[orientation=vertical]:h-px bg-border transition-colors data-[state=hover]:bg-primary data-[state=drag]:bg-primary'
        }" class="rounded-lg border border-default overflow-hidden">
            <template #left>
                <textarea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="w-full min-h-250 resize-none border-0 outline-none bg-transparent p-4 overflow-y-auto"
                    placeholder="Start typing..." v-model="markdown" ref="textarea" />
            </template>

            <template #right>
                <p v-if="markdown === null || markdown === ''" class="text-center self-center w-full" >Start typing on the {{ splitterItems[0]?.slot }} window, your content will be rendered here...</p>
                <div v-else class="w-full h-full p-4">
                    <MDC :value="markdown" tag="article" class="text-wrap wrap-break-word" />
                </div>
            </template>
        </USplitter>
    </div>
</template>