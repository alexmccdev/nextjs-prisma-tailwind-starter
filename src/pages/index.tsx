import { GET as GetUser } from '@api/user'
import Layout from '@components/shared/Layout'
import { SafeUser } from '@types'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'

interface IHomePageProps {
    user: SafeUser
}

const HomePage: React.FC<IHomePageProps> = (props) => {
    return (
        <Layout>
            <pre>Current User:</pre>
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
            user: await GetUser(session.user.id),
        },
    }
}

export default HomePage
