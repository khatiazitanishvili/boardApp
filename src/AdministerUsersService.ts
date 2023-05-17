
/**
 * Ressource "Users".
 */
export type UsersResource = {
    users: UserResource[]
}

/**
 * Ressource "User".
 */
export type UserResource = {
    id?: string
    name: string
    email: string
    admin: boolean
    /**
     * Wird vom Service nur gelesen aber niemals zurückgegeben.
     */
    password?: string
}
