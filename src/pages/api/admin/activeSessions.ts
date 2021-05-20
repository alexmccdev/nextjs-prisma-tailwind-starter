import { Role } from '.prisma/client'
import prisma from '@utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export const GET = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                role: true,
            },
        })

        if (user.role === Role.ADMIN) {
            return await prisma.session.findMany()
        }
    } catch {
        return { error: 'Could not get sessions.' }
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session) {
        return res.json(null)
    }

    switch (req.method) {
        case 'GET':
            return res.json(await GET(session.user.id as string))
        default:
            res.status(405).end()
            break
    }
}
