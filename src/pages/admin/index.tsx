import Layout from '@components/shared/Layout'
import { Loading } from '@components/shared/Loading'
import { SafeUser } from '@types'
import { getAuthenticatedServerSideProps } from '@utils/middleware'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

interface IAdminPageProps {
    user: SafeUser
}

const AdminPage: React.FC<IAdminPageProps> = (props) => {
    const { data: sessions } = useSWR('/api/admin/activeSessions')

    if (!sessions) {
        return (
            <Layout template="one-col">
                <Loading />
            </Layout>
        )
    }

    return (
        <Layout template="one-col">
            <h3>{sessions.length} Active Sessions</h3>
            <Link href="/admin/design">
                <a className="underline">Go to the design page</a>
            </Link>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = getAuthenticatedServerSideProps(null, 'ADMIN')

export default AdminPage
