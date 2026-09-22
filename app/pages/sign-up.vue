<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'

useHead({
    title: `Sign-Up | MarkLab`,
    meta: [
        { name: 'description', content: 'Create a free Marklab account in a matter of seconds.' },
    ],
});

definePageMeta({
    middleware: 'guest',
})

const toast = useToast()

const fields = ref<AuthFormField[]>([
    {
        name: 'username',
        type: 'text',
        label: 'Username'
    },
    {
        name: 'email',
        type: 'email',
        label: 'E-mail'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password'
    },
    {
        name: 'rPassword',
        type: 'password',
        label: 'Repeat Password'
    }
])

async function onSubmit(
    event: FormSubmitEvent<SignupSchema>
) {
    try {
        await $fetch('/api/auth/signup', {
            method: 'POST',
            body: event.data,
        })

        navigateTo('/documents');
    } catch (error) {
        const fetchError = error as FetchError

        toast.add({ title: 'Sign-Up Failed', description: fetchError.statusMessage, icon: "line-md:account-add", color: "error" })
    }
}
</script>

<template>
    <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm title="Sign-Up" description="Create a free account." icon="line-md:account-add" loading-auto :fields="fields"
                :schema="signupSchema" @submit="onSubmit" class="max-w-md">
                <template #footer>
                    Already have an account? <ULink to="/log-in" class="text-primary font-medium">Log-In</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>