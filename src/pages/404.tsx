import Layout from '@components/shared/Layout'
import React from 'react'

interface ICustom404PageProps {}

const Custom404Page: React.FC<ICustom404PageProps> = () => {
    return (
        <Layout template="one-col">
            <h1>Try again, son.</h1>
        </Layout>
    )
}

export default Custom404Page
