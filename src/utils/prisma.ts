import { PrismaClient } from '@prisma/client'

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

let prisma

// Fix connection pool issues on dev due to hot reloading
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }

    prisma = global.prisma
}

export default prisma
