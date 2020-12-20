import React from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { User } from 'next-auth'

interface HomePageProps {
    user: User
}

const HomePage: React.FC<HomePageProps> = (props) => {
    return <>{JSON.stringify(props.user)}</>
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