<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

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
        label: 'Email'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password'
    }
])
</script>

<template>
    <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm title="Log-In" description="Enter your credentials to access your account."
                icon="cuida:login-outline" :fields="fields" class="max-w-md">
                <template #footer>
                    Don't have an account? <ULink to="/sign-up" class="text-primary font-medium">Sign-Up</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>