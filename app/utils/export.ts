export const downloadFile = (
    content: string | Blob,
    filename: string,
    type?: string,
) => {
    const blob = content instanceof Blob
        ? content
        : new Blob([content], { type })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)
}

export const exportMarkdown = (markdown: string, title: string) => {
    downloadFile(
        markdown,
        `${title || 'Untitled Document'}.md`,
        'text/markdown;charset=utf-8',
    )
}

export const exportText = (markdown: string, title: string) => {
    downloadFile(
        markdown,
        `${title || 'Untitled Document'}.txt`,
        'text/plain;charset=utf-8',
    )
}