import React from 'react'
import { GetServerSideProps } from 'next'
import { User } from 'next-auth'
import { getSession } from 'next-auth/client'

interface HomePageProps {
    user: User
}

const HomePage: React.FC<HomePageProps> = (props) => {
    return (
        <>
            <pre>Current User Session:</pre>
            <pre>{JSON.stringify(props.user, null, 4)}</pre>
        </>
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
