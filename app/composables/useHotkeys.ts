export const useHotkeys = (
  handler: (event: KeyboardEvent) => void
) => {
  onMounted(() => {
    window.addEventListener('keydown', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handler)
  })
}