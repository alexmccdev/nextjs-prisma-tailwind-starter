import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { ModalProvider } from 'react-modal-hook'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import '../styles/index.css' // Import this last

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <React.StrictMode>
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
        </React.StrictMode>
    )
}

export default MyApp
