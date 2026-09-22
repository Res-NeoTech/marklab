<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

const { logout } = useAuth();

logout();

navigateTo("/");
</script>