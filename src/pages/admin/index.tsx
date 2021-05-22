import { Role } from '.prisma/client'
import { GET as GetUser } from '@api/user'
import Layout from '@components/shared/Layout'
import { Loading } from '@components/shared/Loading'
import { SafeUser } from '@types'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'
import useSWR from 'swr'

interface IAdminPageProps {
    user: SafeUser
}

const AdminPage: React.FC<IAdminPageProps> = (props) => {
    const { data: sessions } = useSWR('/api/admin/activeSessions')

    if (!sessions) {
        return (
            <Layout>
                <Loading />
            </Layout>
        )
    }

    return (
        <Layout>
            <h3>{sessions.length} Active Sessions</h3>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: { permanent: false, destination: '/login' },
        }
    }

    const user = await GetUser(session.user.id)

    if ((user as SafeUser).role !== Role.ADMIN) {
        return {
            redirect: { permanent: false, destination: '/' },
        }
    }

    return {
        props: {},
    }
}

export default AdminPage
