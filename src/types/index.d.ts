import 'next-auth'

declare module 'next-auth' {
    interface Session extends Record<string, unknown> {
        user?: UserSessionData
        expires?: string
    }

    interface UserSessionData {
        id: string
    }
}

declare global {
    namespace NodeJS {
        interface Global {
            document: Document
            window: Window
            navigator: Navigator
            prisma: PrismaClient
        }
    }
}

export type SafeUser = {
    name: string | null
    email: string
    avatar: string | null
    role: Role
}
