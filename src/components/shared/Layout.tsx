import React from 'react'

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = (props) => {
    return <main className="w-full mx-auto max-w-3xl p-4 flex flex-col flex-grow">{props.children}</main>
}

export default Layout
