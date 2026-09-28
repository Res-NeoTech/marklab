<script setup lang="ts">
import type { SplitterItem } from '@nuxt/ui'
import type { FetchError } from 'ofetch'
import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate } from 'vue-router'
import { useDocumentStore } from '~/stores/useDocumentStore'
import { useUserPrefsStore } from '~/stores/useUserPrefsStore'

type EditorDocument = {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

type DocumentResponse = {
    document: EditorDocument
}

type SaveState = 'saved' | 'saving' | 'error'

definePageMeta({
    middleware: 'auth',
})

const route = useRoute()
const documentId = computed(() => {
    const slug = route.params.slug

    return typeof slug === 'string' ? slug : ''
})

if (!documentId.value) {
    throw createError({ statusCode: 404, statusMessage: 'Document not found.' })
}

const { data, pending, error } = await useFetch<DocumentResponse>(() => `/api/docs/${documentId.value}`, {
    watch: [documentId],
})
const fetchError = error.value as FetchError | null

if (fetchError || !data.value?.document) {
    throw createError({
        statusCode: fetchError?.statusCode === 404 ? 404 : 500,
        statusMessage: fetchError?.statusMessage ?? 'Failed to load document.',
    })
}

const userPrefsStore = useUserPrefsStore()
const documentStore = useDocumentStore()
const { title, markdown } = storeToRefs(documentStore)
const titleInput = useTemplateRef('titleInput')
const textarea = ref<HTMLTextAreaElement | null>(null)
const saveState = ref<SaveState>('saved')
const isLoaded = ref(false)

let savedTitle = ''
let savedContent = ''
let saveTimer: ReturnType<typeof setTimeout> | undefined
let revision = 0

useHead({
    title: computed(() => `${title.value || 'Untitled document'} | MarkLab`),
    meta: [
        { name: 'description', content: 'MarkLab is a simple, cloud-focused Markdown editing tool.' },
    ],
})

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

const hydrateDocument = (document: EditorDocument) => {
    savedTitle = document.title
    savedContent = document.content
    documentStore.$patch({
        title: document.title,
        markdown: document.content,
    })
    saveState.value = 'saved'
    isLoaded.value = true
    nextTick(resizeTextarea)
}

hydrateDocument(data.value.document)

watch(data, (response) => {
    if (response?.document) {
        hydrateDocument(response.document)
    }
})

const saveDocument = async (id: string, version: number) => {
    const titleToSave = title.value.trim() || 'Untitled Document'
    const contentToSave = markdown.value

    try {
        const response = await $fetch<DocumentResponse>(`/api/docs/${id}`, {
            method: 'PATCH',
            body: {
                title: titleToSave,
                content: contentToSave,
            },
        })

        savedTitle = response.document.title
        savedContent = response.document.content

        if (version === revision) {
            documentStore.$patch({
                title: response.document.title,
                markdown: response.document.content,
            })
            saveState.value = 'saved'
        }
    } catch {
        if (version === revision) {
            saveState.value = 'error'
        }
    }
}

const scheduleSave = () => {
    if (!isLoaded.value || (title.value === savedTitle && markdown.value === savedContent)) {
        return
    }

    revision += 1
    saveState.value = 'saving'

    if (saveTimer) {
        clearTimeout(saveTimer)
    }

    const id = documentId.value
    const version = revision
    saveTimer = setTimeout(() => void saveDocument(id, version), 750)
}

const saveNow = async () => {
    if (!isLoaded.value || (title.value === savedTitle && markdown.value === savedContent)) {
        return
    }

    if (saveTimer) {
        clearTimeout(saveTimer)
    }

    revision += 1
    saveState.value = 'saving'
    await saveDocument(documentId.value, revision)
}

onBeforeRouteUpdate(async () => {
    await saveNow()
})

watch([title, markdown], () => {
    scheduleSave()
    nextTick(resizeTextarea)
})

onBeforeUnmount(() => {
    if (saveTimer) {
        clearTimeout(saveTimer)
    }

    void saveNow()
})

onMounted(() => {
    resizeTextarea()

    if (userPrefsStore.layoutPref === 'right') {
        swapLayouts()
    }
})

useHotkeys((event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        void saveNow()
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        titleInput.value?.inputRef?.focus()
    }
})

const splitterItems = ref<SplitterItem[]>([
    { slot: 'left', minSize: 20, defaultSize: 50, class: 'text-muted font-medium' },
    { slot: 'right', minSize: 20, defaultSize: 50, class: 'text-muted font-medium' },
])

const swapLayouts = () => {
    ;[splitterItems.value[0]!.slot, splitterItems.value[1]!.slot] = [
        splitterItems.value[1]?.slot,
        splitterItems.value[0]?.slot,
    ]
    userPrefsStore.layoutPref = splitterItems.value[0]!.slot as string
    resizeTextarea()
}

const saveLabel = computed(() => {
    if (saveState.value === 'saving') return 'Saving…'
    if (saveState.value === 'error') return 'Could not save'

    return 'Saved'
})
</script>

<template>
    <div v-if="pending" class="flex min-h-100 items-center justify-center">
        <UIcon name="mingcute:loading-line" class="size-6 animate-spin text-primary" />
    </div>
    <div v-else>
        <div class="w-full flex justify-center mt-5 mb-5 gap-2 sticky top-20 z-1">
            <div class="flex items-center gap-2">
                <UTooltip arrow :kbds="['meta', 'Enter']" text="Rename">
                    <UInput ref="titleInput" icon="mingcute:markdown-line" size="xl" variant="outline" v-model="title"
                        placeholder="Document Title" />
                </UTooltip>
                <span class="hidden text-sm text-muted sm:inline" :class="{ 'text-error': saveState === 'error' }">
                    {{ saveLabel }}
                </span>
            </div>
            <UTooltip arrow text="Swap layouts">
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
                    <p v-if="markdown === null || markdown === ''" class="text-center self-center w-full">Start typing
                        on
                        the {{ splitterItems[0]?.slot }} window, your content will be rendered here...</p>
                    <div v-else class="w-full h-full p-4">
                        <MDC :value="documentStore.markdown" tag="article" class="text-wrap wrap-break-word" />
                    </div>
                </template>
            </USplitter>
        </div>
    </div>
</template>
