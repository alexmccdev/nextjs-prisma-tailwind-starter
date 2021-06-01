import Layout from '@components/shared/Layout'
import React from 'react'

interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = () => {
    return (
        <Layout title="Home" template="one-col">
            <h1>Welcome to my Next.js Prisma Tailwind Starter</h1>
            <p>
                I spin up other projects using this codebase as a template. You can check out the code{' '}
                <a
                    className="underline"
                    href="https://github.com/alexmccdev/nextjs-prisma-tailwind-starter"
                    target="_blank"
                >
                    here
                </a>
                .
            </p>
            <img src="https://picsum.photos/1000" className="w-full" />
        </Layout>
    )
}

export default HomePage
