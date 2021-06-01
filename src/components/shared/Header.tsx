import { Avatar } from '@components/shared/Avatar'
import useUser from '@hooks/useUser'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import React from 'react'

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
    const [session, sessionLoading] = useSession()

    if (sessionLoading || !session) {
        return (
            <header>
                <SiteLogo />
            </header>
        )
    }

    const { user, loading: userLoading } = useUser()

    return (
        <header>
            <SiteLogo />
            {!userLoading && (
                <div className="flex items-center">
                    <Link href="/account">
                        <a className="ml-4">
                            <Avatar size="small" src={user.avatar as string} alt={user.name} />
                        </a>
                    </Link>
                </div>
            )}
        </header>
    )
}

interface ISiteLogoProps {}

const SiteLogo: React.FC<ISiteLogoProps> = () => {
    return (
        <Link href="/home">
            <a className="flex my-auto">
                <img src="/vercel.svg" className="h-6" />
            </a>
        </Link>
    )
}

export default Header
