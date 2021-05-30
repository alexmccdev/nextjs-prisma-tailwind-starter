import { Prisma, User } from '@prisma/client'
import { authenticateRequest } from '@utils/middleware'
import prisma from '@utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { SafeUser } from 'types'

export const GetUser = async (id: string) => {
    try {
        return translateToSafeUser(
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

export const UpdateUser = async (id: string, data: Prisma.UserUpdateInput) => {
    try {
        return translateToSafeUser(
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

const translateToSafeUser = (user: User) => {
    return {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
    } as SafeUser
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await authenticateRequest(req, res)

        switch (req.method) {
            case 'GET':
                return res.json(await GetUser(req.session.user.id))
            case 'PATCH':
                return res.json(await UpdateUser(req.session.user.id, req.body))
            default:
                res.status(405).end()
                break
        }
    } catch {
        res.status(500).end()
    }
}
