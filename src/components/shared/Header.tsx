import Link from 'next/link'
import React from 'react'
import router from 'next/router'
import { signOut } from 'next-auth/client'
import { useUser } from '@contexts/UserContext'

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
    const { user, loading } = useUser()

    if (!user || loading) {
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
                    <>
                        <Link href="/account">
                            <button className="btn mr-2">Edit Account</button>
                        </Link>

                        <button className="btn bg-error text-white" onClick={() => signOut()}>
                            Logout {user.email}
                        </button>
                    </>
                ) : (
                    <button className="btn" onClick={() => router.push('/login')}>
                        Login
                    </button>
                )}
            </div>
        </header>
    )
}

interface ISiteLogoProps {}

const SiteLogo: React.FC<ISiteLogoProps> = () => {
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
