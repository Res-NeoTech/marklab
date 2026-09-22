<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

const { logout } = useAuth();

logout();

navigateTo("/log-in");
</script>