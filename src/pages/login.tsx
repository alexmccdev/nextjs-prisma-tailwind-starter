import { LoginForm } from '@components/UserForms'
import React from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Layout from '@components/shared/Layout'

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
            redirect: { permanent: false, destination: '/' },
        }
    }

    return {
        props: {},
    }
}

export default LoginPage
