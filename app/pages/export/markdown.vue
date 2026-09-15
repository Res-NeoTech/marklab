<script setup lang="ts">
const documentStore = useDocumentStore();

const exportMarkdown = () => {
    const blob = new Blob([documentStore.markdown], {
        type: 'text/markdown;charset=utf-8',
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = `${documentStore.title || 'Untitled Document'}.md`
    a.click()

    URL.revokeObjectURL(url)
}

exportMarkdown();

navigateTo("/");
</script>