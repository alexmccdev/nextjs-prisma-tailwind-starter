import { AdministerNameForm } from '@components/UserForms'
import React from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { Prisma, User } from '@prisma/client'
import useSWR, { trigger } from 'swr'
import useToast from '@hooks/useToast'
import axios from 'axios'

interface AccountPageProps {
    user: User
}

const AccountPage: React.FC<AccountPageProps> = (props) => {
    const { data: user, mutate } = useSWR('/api/user', {
        initialData: props.user,
    })

    const { showError, showSuccess } = useToast()

    const handleUpdateUser = async (userUpdates: Prisma.UserUpdateInput) => {
        mutate({ ...user, ...userUpdates } as User, false)

        const { data } = await axios.patch('/api/user', { ...userUpdates })

        if (!data.error) {
            showSuccess('User updated')
        } else {
            showError(data.error)
        }

        trigger('/api/user')
    }

    return (
        <div>
            <AdministerNameForm name={props.user.name} updateName={handleUpdateUser} maxLength={32} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: { permanent: false, destination: '/login' },
        }
    }

    return {
        props: {
            user: session.user,
        },
    }
}

export default AccountPage
