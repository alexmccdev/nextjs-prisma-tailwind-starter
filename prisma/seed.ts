import { PrismaClient } from '@prisma/client'
import faker from 'faker'

const prisma = new PrismaClient()
const environment = process.env.NODE_ENV

const emailsToKeep = ['alexmcc.dev@gmail.com']

async function main() {
    if (environment !== 'development') {
        return
    }

    await prisma.user.deleteMany({
        where: {
            NOT: emailsToKeep.map((email) => {
                return {
                    email,
                }
            }),
        },
    })

    for (let i = 0; i < 100; i++) {
        await prisma.user.create({
            data: {
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                email: faker.internet.email(),
                avatar: faker.internet.avatar(),
            },
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
