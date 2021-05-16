import { Prisma, Role, User } from '@prisma/client'
import prisma from '@utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

type SafeUser = {
    name: string | null
    email: string
    avatar: string | null
    role: Role
}

export const GET = async (id: string) => {
    try {
        return getSafeUser(
            await prisma.user.findUnique({
                where: {
                    id,
                },
            })
        )
    } catch {
        return { error: 'Could not find user.' }
    }
}

export const PATCH = async (id: string, data: Prisma.UserUpdateInput) => {
    try {
        return getSafeUser(
            await prisma.user.update({
                where: {
                    id,
                },
                data,
            })
        )
    } catch {
        return { error: 'Something went wrong.' }
    }
}

const getSafeUser = (user: User) => {
    return {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
    } as SafeUser
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session) {
        return res.json(null)
    }

    switch (req.method) {
        case 'GET':
            return res.json(await GET(session.user.id as string))
        case 'PATCH':
            return res.json(await PATCH(session.user.id as string, req.body))
        default:
            res.status(405).end()
            break
    }
}
