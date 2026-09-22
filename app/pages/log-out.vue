<script setup lang="ts">
const { logout } = useAuth();

logout();

navigateTo("/log-in");
</script>