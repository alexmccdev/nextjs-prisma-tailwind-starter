import { User } from '@prisma/client'
import { sendVerificationRequest } from '@utils/email'
import prisma from '@utils/prisma'
import NextAuth, { Session } from 'next-auth'
import Adapters from 'next-auth/adapters'
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils'
import Providers, { EmailConfig } from 'next-auth/providers'

let emailProviderOptions: Partial<EmailConfig> = {
    server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    },
    from: process.env.EMAIL_FROM,
    sendVerificationRequest: null,
}

// Console log the email links if not in production
if (process.env.NODE_ENV !== 'production') {
    emailProviderOptions.sendVerificationRequest = ({ identifier: email, url }) => {
        console.log('\x1b[32m%s\x1b[0m', `Magic Link for ${email}:`)
        console.log('\x1b[32m%s\x1b[0m', url)
    }
}

if (process.env.NODE_ENV === 'production') {
    emailProviderOptions.sendVerificationRequest = ({ identifier: email, url }) => {
        return sendVerificationRequest(email, url)
    }
}

const options = {
    providers: [Providers.Email(emailProviderOptions)],
    secret: process.env.SECRET,
    pages: {
        signIn: '/login', // Displays signin buttons
        // signOut: '/api/auth/signout', // Displays form with sign out button
        // error: '/api/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/email-verification', // Used for check email page
        // newUser: null, // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async session(session: Session, token: User) {
            session.user = { id: token.id }
            return session
        },
        async redirect(url: string, baseUrl: string) {
            return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl)
        },
    },
    debug: process.env.NODE_ENV !== 'production' && process.env.NEXTAUTH_LOG === 'true',
    adapter: Adapters.Prisma.Adapter({
        prisma,
    }),
}

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options)
