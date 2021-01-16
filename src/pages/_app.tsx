import Header from '@components/shared/Header'
import Layout from '@components/shared/Layout'
import Progress from '@components/shared/Progress'
import React from 'react'
import axios from 'axios'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from '../contexts/UserContext'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/index.css' // Import this last

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <SWRConfig
            value={{
                fetcher: async (url: string) => {
                    const res = await axios.get(url)
                    return res.data
                },
            }}
        >
            <UserProvider>
                <Header />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <Progress />
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
            </UserProvider>
        </SWRConfig>
    )
}

export default MyApp
