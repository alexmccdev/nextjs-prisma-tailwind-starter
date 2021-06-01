import Layout from '@components/shared/Layout'
import UserCard from '@components/UserCard'
import useUser from '@hooks/useUser'
import { getAuthenticatedServerSideProps } from '@utils/middleware'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'

interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = () => {
    const { user, loading: userLoading } = useUser()

    return (
        <Layout title="Home" template="three-col">
            <div className="left-main">
                <div>{!userLoading && <UserCard user={user} />}</div>
            </div>

            <div className="center-main">
                <h2 className="w-full pb-4 mb-4 border-b">Your feed</h2>
                <p className="text-center opacity-50">Your feed is empty...</p>
            </div>

            <div className="right-main">
                <div className="card">
                    This is the homepage and a good representation of the 3 column responsive layout.
                    <br />
                    <br />
                    {!userLoading && user.role === 'ADMIN' && (
                        <Link href="/admin">
                            <a className="underline">To the admin page</a>
                        </Link>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = getAuthenticatedServerSideProps()

export default HomePage
