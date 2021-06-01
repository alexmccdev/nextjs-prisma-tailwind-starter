import { IncomingMessage } from 'http'
import 'next'
import 'next-auth'
import { Session } from 'next-auth'

declare module 'next-auth' {
    interface Session extends Record<string, unknown> {
        user: UserSessionData
        expires?: string
    }

    interface UserSessionData {
        id: string
    }
}

export type SafeUser = {
    name: string | null
    email: string
    avatar: string | null
    role: Role
}

declare module 'next' {
    export interface NextApiRequest extends IncomingMessage {
        session: Session
    }
}
