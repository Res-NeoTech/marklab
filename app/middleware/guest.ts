export default defineNuxtRouteMiddleware(async () => {
    const { isAuthenticated, fetchUser, initialized, user } = useAuth()

    if (!initialized.value) {
        await fetchUser()
    }

    if (isAuthenticated.value) {
        console.log('REDIRECTING')
        return navigateTo('/documents')
    }
})