<script setup lang="ts">
import type { FetchError } from 'ofetch'

type DocumentItem = {
    id: string
    title: string
    createdAt: string
    updatedAt: string
}

type DocumentsResponse = {
    documents: DocumentItem[]
}

type CreateDocumentResponse = {
    document: DocumentItem
}

definePageMeta({
    middleware: 'auth',
})

useHead({
    title: 'My Documents | MarkLab',
    meta: [
        { name: 'description', content: 'Manage your Markdown documents in MarkLab.' },
    ],
})

const toast = useToast()
const creating = ref(false)

const { data, pending, error, refresh } = await useFetch<DocumentsResponse>('/api/docs')

const documents = computed(() => data.value?.documents ?? [])
const errorMessage = computed(() => {
    const fetchError = error.value as FetchError | null

    return fetchError?.statusMessage ?? 'We could not load your documents. Please try again.'
})

const formatDate = (value: string) => {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return 'Unknown date'
    }

    return new Intl.DateTimeFormat('en-CH', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Europe/Zurich',
    }).format(date)
}

const createDocument = async () => {
    creating.value = true

    try {
        const response = await $fetch<CreateDocumentResponse>('/api/docs', {
            method: 'POST',
            body: {},
        })

        toast.add({
            title: 'Document created',
            description: `Opening "${response.document.title}".`,
            icon: 'mingcute:file-new-line',
            color: 'success',
        })

        await navigateTo(`/documents/${response.document.id}`)
    } catch (error) {
        const fetchError = error as FetchError

        toast.add({
            title: 'Could not create document',
            description: fetchError.statusMessage ?? 'Please try again.',
            icon: 'mingcute:close-circle-line',
            color: 'error',
        })
    } finally {
        creating.value = false
    }
}
</script>

<template>
    <div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <header class="flex flex-col gap-6 border-b border-default pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div class="space-y-2">
                <p class="text-sm font-medium text-primary">Workspace</p>
                <h1 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">My documents</h1>
                <p class="max-w-2xl text-base text-muted">
                    Create, find, and continue working on your Markdown documents.
                </p>
            </div>

            <div class="flex shrink-0 gap-2">
                <UTooltip text="Refresh documents">
                    <UButton
                        icon="mingcute:refresh-2-line"
                        color="neutral"
                        variant="ghost"
                        :loading="pending"
                        aria-label="Refresh documents"
                        @click="refresh"
                    />
                </UTooltip>
                <UButton label="New document" icon="mingcute:file-new-line" :loading="creating" @click="createDocument" />
            </div>
        </header>

        <div class="mt-8">
            <UAlert
                v-if="error"
                color="error"
                variant="subtle"
                title="Documents could not be loaded"
                :description="errorMessage"
                icon="mingcute:warning-line"
            >
                <template #actions>
                    <UButton label="Try again" color="error" variant="soft" size="sm" @click="refresh" />
                </template>
            </UAlert>

            <div v-else-if="pending" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <UCard v-for="index in 6" :key="index" :ui="{ body: 'space-y-4' }">
                    <USkeleton class="h-5 w-3/5" />
                    <USkeleton class="h-4 w-2/5" />
                    <USkeleton class="h-4 w-4/5" />
                </UCard>
            </div>

            <section v-else-if="documents.length" aria-label="Documents">
                <div class="mb-4 flex items-center justify-between">
                    <p class="text-sm text-muted">
                        {{ documents.length }} {{ documents.length === 1 ? 'document' : 'documents' }}
                    </p>
                    <p class="text-sm text-muted">Most recently updated first</p>
                </div>

                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <NuxtLink v-for="document in documents" :key="document.id" :to="`/documents/${document.id}`"
                        class="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        <UCard class="group transition-shadow hover:shadow-md" :ui="{ body: 'space-y-5' }">
                        <div class="flex items-start gap-3">
                            <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <UIcon name="mingcute:markdown-line" class="size-5" />
                            </div>
                            <div class="min-w-0">
                                <h2 class="truncate font-semibold text-highlighted" :title="document.title">
                                    {{ document.title }}
                                </h2>
                                <p class="mt-1 text-sm text-muted">Markdown document</p>
                            </div>
                        </div>

                        <div class="border-t border-default pt-4 text-sm text-muted">
                            <p>Updated {{ formatDate(document.updatedAt) }}</p>
                            <p class="mt-1">Created {{ formatDate(document.createdAt) }}</p>
                        </div>
                        </UCard>
                    </NuxtLink>
                </div>
            </section>

            <section v-else class="rounded-xl border border-dashed border-default px-6 py-16 text-center">
                <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UIcon name="mingcute:markdown-line" class="size-6" />
                </div>
                <h2 class="mt-5 text-lg font-semibold text-highlighted">No documents yet</h2>
                <p class="mx-auto mt-2 max-w-sm text-sm text-muted">
                    Create your first document to start writing in Markdown.
                </p>
                <UButton
                    class="mt-6"
                    label="Create your first document"
                    icon="mingcute:file-new-line"
                    :loading="creating"
                    @click="createDocument"
                />
            </section>
        </div>
    </div>
</template>
