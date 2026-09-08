<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

useHead({
    title: `Error - ${props.error.status} | MarkLab`,
});
</script>

<template>
    <UError :error="{
        statusCode: props.error.status,
        statusMessage: props.error.statusText
    }" />
</template>