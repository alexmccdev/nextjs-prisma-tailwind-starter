import { authenticateRequest } from '@utils/middleware'
import prisma from '@utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export const GET = async (id: string) => {
    try {
        return await prisma.session.findMany()
    } catch {
        return { error: 'Could not get sessions.' }
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await authenticateRequest(req, res, 'ADMIN')

        switch (req.method) {
            case 'GET':
                return res.json(await GET(req.session.user.id))
            default:
                res.status(405).end()
                break
        }
    } catch {
        res.status(500).end()
    }
}
