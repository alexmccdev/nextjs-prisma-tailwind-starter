import axios from 'axios'
import { Provider as SessionProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import React from 'react'
import { ModalProvider } from 'react-modal-hook'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import '../styles/index.css' // Import this last

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <React.StrictMode>
            <SessionProvider session={pageProps.session}>
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
            </SessionProvider>
        </React.StrictMode>
    )
}

export default MyApp
