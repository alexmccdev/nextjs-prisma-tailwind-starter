import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'

const prisma = new PrismaClient()

export const GET = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        })
    } catch {
        return { error: 'Could not find user.' }
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session) {
        return res.json(null)
    }

    switch (req.method) {
        case 'GET':
            return res.json(await GET(session.user.email))

        default:
            res.status(405).end()
            break
    }
}
