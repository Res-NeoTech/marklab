<script setup lang="ts">
import type { SplitterItem } from '@nuxt/ui'
import { useDocumentStore } from '~/stores/useDocumentStore';
import { useUserPrefsStore } from '~/stores/useUserPrefsStore';

const userPrefsStore = useUserPrefsStore();

const documentStore = useDocumentStore();
const title = ref<string>(documentStore.title);
const markdown = ref<string>(documentStore.markdown);

const titleInput = useTemplateRef("titleInput");

useHead({
    title: `${title.value || 'Untitled document'} | MarkLab`,
    meta: [
        { name: 'description', content: 'MarkLab is a simple, cloud-focused Markdown editing tool.' },
    ],
});

definePageMeta({
    middleware: 'guest',
})

watch(title, (newVal) => {
    documentStore.title = newVal;
    document.title = `${newVal || 'Untitled document'} | MarkLab`;
})

watch(markdown, (newVal) => {
    documentStore.markdown = newVal;
    nextTick(resizeTextarea)
});

onMounted(() => {
    resizeTextarea()

    if (userPrefsStore.layoutPref === "right") {
        swapLayouts();
    }
})

useHotkeys((event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        swapLayouts();
    }

    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault()
        titleInput.value?.inputRef?.focus()
    }
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

const splitterItems = ref<SplitterItem[]>([
    { slot: 'left', minSize: 20, defaultSize: 50, class: 'text-muted font-medium' },
    { slot: 'right', minSize: 20, defaultSize: 50, class: 'text-muted font-medium' }
])

const swapLayouts = () => {
    ;[splitterItems.value[0]!.slot, splitterItems.value[1]!.slot] = [
        splitterItems.value[1]?.slot,
        splitterItems.value[0]?.slot
    ]
    userPrefsStore.layoutPref = splitterItems.value[0]!.slot as string;
    resizeTextarea();
}
</script>

<template>
    <div class="w-full flex justify-center mt-5 mb-5 gap-2 sticky top-20 z-1">
        <UTooltip arrow :kbds="['meta', 'Enter']" text="Rename">
            <UInput ref="titleInput" icon="mingcute:markdown-line" size="xl" variant="outline" v-model="title"
                placeholder="Document Title" />
        </UTooltip>
        <UTooltip arrow :kbds="['meta', 'S']" text="Swap layouts">
            <UButton icon="mingcute:transfer-3-line" size="xl" variant="solid" @click="swapLayouts" />
        </UTooltip>
    </div>
    <div class="w-full min-h-250">
        <USplitter id="splitter-custom-handle-example" :items="splitterItems" @resize="resizeTextarea" :ui="{
            handle:
                'data-[orientation=horizontal]:w-px data-[orientation=vertical]:h-px bg-border transition-colors data-[state=hover]:bg-primary data-[state=drag]:bg-primary'
        }" class="rounded-lg border border-default overflow-hidden">
            <template #left>
                <textarea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                    class="w-full min-h-250 resize-none border-0 outline-none bg-transparent p-4 overflow-y-auto"
                    placeholder="Start typing..." v-model="markdown" ref="textarea" />
            </template>

            <template #right>
                <p v-if="markdown === null || markdown === ''" class="text-center self-center w-full">Start typing on
                    the {{ splitterItems[0]?.slot }} window, your content will be rendered here...</p>
                <div v-else class="w-full h-full p-4">
                    <MDC :value="markdown" tag="article" class="text-wrap wrap-break-word" />
                </div>
            </template>
        </USplitter>
    </div>
</template>