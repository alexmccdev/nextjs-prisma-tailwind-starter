import Layout from '@components/shared/Layout'
import { GetServerSideProps } from 'next'
import { UserSessionData } from 'next-auth'
import { getSession } from 'next-auth/client'
import React from 'react'

interface IHomePageProps {
    user: UserSessionData
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
