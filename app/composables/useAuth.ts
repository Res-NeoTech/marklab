export interface AuthUser {
    id: string
    username: string
    email: string
    createdAt: Date
}

export const useAuth = () => {
    const user = useState<AuthUser | null>('auth:user', () => null)
    const initialized = useState<boolean>('auth:initialized', () => false)

    const isAuthenticated = computed(() => user.value !== null)

    async function fetchUser() {
        try {
            const response = await $fetch('/api/auth/me', {
                headers: useRequestHeaders(['cookie']),
            })

            user.value = {
                ...response.user,
                createdAt: new Date(response.user.createdAt),
            }
        } catch {
            user.value = null
        } finally {
            initialized.value = true
        }
    }

    async function logout() {
        await $fetch('/api/auth/logout', {
            method: 'POST',
        })

        user.value = null
    }

    return {
        user,
        isAuthenticated,
        initialized,
        fetchUser,
        logout,
    }
}