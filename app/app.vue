<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { fetchUser, isAuthenticated } = useAuth();

await callOnce('auth-user', fetchUser);

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Document',
    icon: 'mingcute:document-2-line',
    children: [
      {
        label: 'New',
        description: 'Create new blank document.',
        icon: 'mingcute:file-new-line',
      },
      {
        label: 'Create A Copy',
        description: 'Clone your existing document.',
        icon: 'mingcute:copy-2-line',
      },
      {
        label: 'Remove',
        description: 'Remove your existing document.',
        icon: 'mingcute:delete-2-line',
      },
      {
        label: 'My Documents',
        description: 'View your saved documents.',
        icon: 'mingcute:document-2-line',
      },
    ],
  },

  {
    label: 'Export',
    icon: 'mingcute:file-export-line',
    children: [
      {
        label: 'Markdown',
        description: 'Export this document to Markdown file.',
        to: '/export/markdown',
        icon: 'mingcute:markdown-line',
      },
      {
        label: 'Text',
        description: 'Export this document to TXT file.',
        to: '/export/text',
        icon: 'mingcute:text-fill',
      },
    ],
  },

  {
    label: 'Account',
    icon: 'akar-icons:person',
    children: isAuthenticated.value
      ? [
        {
          label: 'Log-Out',
          description: 'Log-Out from this account.',
          icon: 'gg:log-off',
          to: '/log-out',
        },
      ]
      : [
        {
          label: 'Log-In',
          description: 'Log-In to your existing account.',
          icon: 'cuida:login-outline',
          to: '/log-in',
        },
        {
          label: 'Sign-Up',
          description: 'Create a new account.',
          icon: 'line-md:account-add',
        },
      ],
  },
])
</script>

<template>
  <UApp>
    <UHeader title="MarkLab">
      <UNavigationMenu :items="items" />
      <template #right>
        <UColorModeButton />
      </template>
      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>
    <UMain>
      <NuxtLayout>
        <NuxtAnnouncer />
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <UFooter>
      <template #left>
        <p class="text-muted text-sm">&copy; {{ new Date().getFullYear() }} MarkLab</p>
      </template>
      <template #right>
        <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" to="https://github.com/Res-NeoTech"
          target="_blank" aria-label="GitHub" />
        <UButton icon="mingcute:information-line" color="neutral" variant="ghost" to="https://maksym.ch" target="_blank"
          aria-label="GitHub" />
      </template>
    </UFooter>
  </UApp>
</template>