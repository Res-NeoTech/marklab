<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

useHead({
    title: `Sign-Up | MarkLab`,
    meta: [
        { name: 'description', content: 'Create a free Marklab account in a matter of seconds.' },
    ],
});

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

function onSubmit(payload: FormSubmitEvent<SignupSchema>) {
    console.log('Submitted', payload)
}
</script>

<template>
    <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm title="Sign-Up" description="Create a free account."
                icon="line-md:account-add" :fields="fields" :schema="signupSchema" @submit="onSubmit" class="max-w-md">
                <template #footer>
                    Already have an account? <ULink to="/log-in" class="text-primary font-medium">Log-In</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>