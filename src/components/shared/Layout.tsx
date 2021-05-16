import Header from '@components/shared/Header'
import TopProgress from '@components/shared/Progress'
import Head from 'next/head'
import React from 'react'
import { ToastContainer } from 'react-toastify'

interface ILayoutProps {
    title?: string
}

const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{`${title ? title + ' | ' : ''} ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
            </Head>
            <TopProgress />
            <Header />
            <main>{children}</main>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={true}
                pauseOnHover={false}
            />
        </>
    )
}

export default Layout
