export default defineNuxtRouteMiddleware(async () => {
    const { isAuthenticated, fetchUser, initialized } = useAuth()

    if (!initialized.value) {
        await fetchUser()
    }

    if (!isAuthenticated.value) {
        return navigateTo('/log-in')
    }
})