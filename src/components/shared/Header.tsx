import Link from 'next/link'
import React from 'react'
import router from 'next/router'
import { useUser } from '@contexts/UserContext'
import { signOut } from 'next-auth/client'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const { user } = useUser()

    if (!user) {
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
                    <button className="btn" onClick={() => signOut()}>
                        Logout {user.email}
                    </button>
                ) : (
                    <button className="btn" onClick={() => router.push('/login')}>
                        Login
                    </button>
                )}
            </div>
        </header>
    )
}

const SiteLogo: React.FC = () => {
    return (
        <Link href="/">
            <a className="flex h-full">
                <h1 className="self-center" title={'Next.js Prisma Tailwind Starter'}>
                    Next.js Prisma Tailwind Starter
                </h1>
            </a>
        </Link>
    )
}

export default Header
