<script setup lang="ts">
const documentStore = useDocumentStore();

if (!documentStore.markdown) {
    navigateTo("/");
}

exportMarkdown(documentStore.markdown, documentStore.title);

navigateTo("/");
</script>