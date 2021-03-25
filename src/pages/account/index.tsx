import { AdministerAvatarForm, AdministerNameForm } from '@components/UserForms'
import React from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { Prisma, User } from '@prisma/client'
import useSWR, { trigger } from 'swr'
import useToast from '@hooks/useToast'
import axios from 'axios'
import { GET as GetUser } from '@api/user'

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
            <AdministerNameForm name={user.name} updateName={handleUpdateUser} maxLength={32} />
            <AdministerAvatarForm
                avatar={user.avatar}
                updateAvatar={handleUpdateUser}
                defaultAvatar={'/default_avatar.jpg'}
            />
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
            user: JSON.parse(JSON.stringify(await GetUser(session.user.id))),
        },
    }
}

export default AccountPage
