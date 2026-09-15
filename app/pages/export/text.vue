<script setup lang="ts">
const documentStore = useDocumentStore();

if (!documentStore.markdown || documentStore.markdown.trim() === "") {
    navigateTo("/");
}

exportText(documentStore.markdown, documentStore.title);

navigateTo("/");
</script>