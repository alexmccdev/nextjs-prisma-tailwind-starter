import Layout from '@components/shared/Layout'
import { LoginForm } from '@components/UserForms'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'

interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = () => {
    return (
        <Layout title="Login">
            <LoginForm />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (session) {
        return {
            props: {},
            redirect: { permanent: false, destination: '/' },
        }
    }

    return {
        props: {},
    }
}

export default LoginPage
