import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        const setInitialTheme = `
            function getUserPreference() {
            if(window.localStorage.getItem('theme')) {
                return window.localStorage.getItem('theme')
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light'
            }
            document.querySelector('html').className = getUserPreference();
        `

        return (
            <Html lang="en">
                <Head />
                <body>
                    <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
