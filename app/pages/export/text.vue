<script setup lang="ts">
const documentStore = useDocumentStore();

exportText(documentStore.markdown, documentStore.title);

navigateTo("/");
</script>