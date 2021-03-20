import 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string
        role: string
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
