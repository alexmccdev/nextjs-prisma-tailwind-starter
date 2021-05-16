import React from 'react'
import axios from 'axios'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import { ModalProvider } from 'react-modal-hook'

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
            <ModalProvider>
                <Component {...pageProps} />
            </ModalProvider>
        </SWRConfig>
    )
}

export default MyApp
