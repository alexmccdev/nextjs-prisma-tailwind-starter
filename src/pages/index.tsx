import Layout from '@components/shared/Layout'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/client'
import React from 'react'

interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = () => {
    const [session] = useSession()

    return (
        <Layout title="Home">
            <pre>Current User:</pre>
            <pre>{JSON.stringify(session.user, null, 4)}</pre>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            props: {},
            redirect: { permanent: false, destination: '/login' },
        }
    }

    return {
        props: {
            session,
        },
    }
}

export default HomePage
