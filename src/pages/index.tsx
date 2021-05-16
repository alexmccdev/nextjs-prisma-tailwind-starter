import React from 'react'
import { GetServerSideProps } from 'next'
import { UserSession } from 'next-auth'
import { getSession } from 'next-auth/client'
import Layout from '@components/shared/Layout'

interface IHomePageProps {
    user: UserSession
}

const HomePage: React.FC<IHomePageProps> = (props) => {
    return (
        <Layout>
            <pre>Current User Session:</pre>
            <pre>{JSON.stringify(props.user, null, 4)}</pre>
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

    return {
        props: {
            user: session.user,
        },
    }
}

export default HomePage
