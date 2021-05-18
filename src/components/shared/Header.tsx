import { Avatar } from '@components/shared/Avatar'
import useUser from '@hooks/useUser'
import Link from 'next/link'
import router from 'next/router'
import React from 'react'

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
    const { user, loading } = useUser()

    if (loading) {
        return (
            <header>
                <SiteLogo />
            </header>
        )
    }

    return (
        <header>
            <SiteLogo />
            <div className="flex items-center">
                {user ? (
                    <Link href="/account">
                        <a>
                            <Avatar src={user.avatar as string} alt={user.name} />
                        </a>
                    </Link>
                ) : (
                    <button className="btn btn-primary" onClick={() => router.push('/login')}>
                        Login
                    </button>
                )}
            </div>
        </header>
    )
}

interface ISiteLogoProps {}

const SiteLogo: React.FC<ISiteLogoProps> = () => {
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME
    return (
        <Link href="/">
            <a className="flex h-full">
                <h1 className="self-center" title={siteName}>
                    {siteName}
                </h1>
            </a>
        </Link>
    )
}

export default Header
