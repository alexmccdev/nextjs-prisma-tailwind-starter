import Layout from '@components/shared/Layout'
import { Loading } from '@components/shared/Loading'
import { SafeUser } from '@types'
import { getAuthenticatedServerSideProps } from '@utils/middleware'
import { GetServerSideProps } from 'next'
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

export const getServerSideProps: GetServerSideProps = getAuthenticatedServerSideProps(null, 'ADMIN')

export default AdminPage
