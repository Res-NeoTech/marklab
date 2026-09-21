<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

useHead({
    title: `Log-In | MarkLab`,
    meta: [
        { name: 'description', content: 'Log-In to your existing Marklab account.' },
    ],
});

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

function onSubmit(payload: FormSubmitEvent<LoginSchema>) {
    console.log('Submitted', payload)
}
</script>

<template>
    <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm title="Log-In" description="Enter your credentials to access your account."
                icon="cuida:login-outline" :fields="fields" :schema="loginSchema" class="max-w-md" @submit="onSubmit">
                <template #footer>
                    Don't have an account? <ULink to="/sign-up" class="text-primary font-medium">Sign-Up</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>