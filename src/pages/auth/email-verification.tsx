import Layout from '@components/shared/Layout'
import UncontrolledLottie from '@components/shared/UncontrolledLottie'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Link from 'next/link'
import React from 'react'
import MailSend from '../../animations/MailSend.json'

const VerifyEmail = () => {
    return (
        <Layout title="Verify" template="one-col">
            <UncontrolledLottie animationData={MailSend} />
            <p className="mx-auto mb-4">A verification link has been sent to your email!</p>
            <button className="mx-auto btn btn-primary">
                <Link href="/login">Back to Login</Link>
            </button>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: { permanent: false, destination: '/home' },
        }
    }

    return {
        props: {},
    }
}

export default VerifyEmail
