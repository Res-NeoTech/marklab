<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

const { logout } = useAuth();

logout().then(() => reloadNuxtApp());
</script>