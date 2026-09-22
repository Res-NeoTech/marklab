<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'

useHead({
    title: `Log-In | MarkLab`,
    meta: [
        { name: 'description', content: 'Log-In to your existing Marklab account.' },
    ],
});

const toast = useToast()

const fields = ref<AuthFormField[]>([
    {
        name: 'email',
        type: 'email',
        label: 'E-mail'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password'
    }
])

async function onSubmit(
    event: FormSubmitEvent<SignupSchema>
) {
    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: event.data,
        })

        navigateTo('/documents');
    } catch (error) {
        const fetchError = error as FetchError

        toast.add({ title: 'Log-In Failed', description: fetchError.statusMessage, icon: "cuida:login-outline", color: "error" })
    }
}
</script>

<template>
    <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm title="Log-In" description="Enter your credentials to access your account."
                icon="cuida:login-outline" :fields="fields" :schema="loginSchema" class="max-w-md" loading-auto @submit="onSubmit">
                <template #footer>
                    Don't have an account? <ULink to="/sign-up" class="text-primary font-medium">Sign-Up</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>