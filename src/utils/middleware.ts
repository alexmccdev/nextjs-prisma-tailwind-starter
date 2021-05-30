import { GetUser as GetUser } from '@api/user'
import { Role } from '@prisma/client'
import { SafeUser } from '@types'
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'

const redirectToLogin = {
    props: {},
    redirect: {
        destination: '/login',
        permanent: false,
    },
}

export const getAuthenticatedServerSideProps = (
    afterAuthenticationFn?:
        | ((authContext: GetServerSidePropsContext, authSession: Session) => Promise<GetServerSidePropsResult<any>>)
        | null,
    role?: Role
) => {
    return async (context: GetServerSidePropsContext) => {
        const session = await getSession(context)

        // User is not logged in.
        if (!session) {
            return redirectToLogin
        }

        // User does not have the proper role.
        if (role) {
            const user = await GetUser(session.user.id)

            if ((user as SafeUser).role !== role) {
                return redirectToLogin
            }
        }

        // Either return the session or subsequent function to run after authentication
        return afterAuthenticationFn ? afterAuthenticationFn(context, session) : { props: { session } }
    }
}

export const authenticateRequest = async (req: NextApiRequest, res: NextApiResponse, role?: Role) => {
    try {
        const session = await getSession({ req })

        if (!session) {
            return res.status(401).end()
        }

        // User does not have the proper role.
        if (role) {
            const user = await GetUser(session.user.id)

            if ((user as SafeUser).role !== role) {
                return res.status(403).end()
            }
        }

        req.session = session
    } catch {
        res.status(500).end()
    }
}
