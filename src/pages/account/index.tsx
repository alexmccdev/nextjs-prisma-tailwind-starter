import { GetUser as GetUser } from '@api/user'
import Layout from '@components/shared/Layout'
import { AdministerAvatarForm, AdministerNameForm, LogoutForm } from '@components/UserForms'
import useToast from '@hooks/useToast'
import useUser from '@hooks/useUser'
import { Prisma, User } from '@prisma/client'
import { getAuthenticatedServerSideProps } from '@utils/middleware'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import { SafeUser } from 'types'

interface AccountPageProps {
    user: SafeUser
}

const AccountPage: React.FC<AccountPageProps> = (props) => {
    const { user, mutateUserCache, refreshUserCache } = useUser({
        initialData: props.user,
    })

    const { showError, showSuccess } = useToast()

    const handleUpdateUser = async (userUpdates: Prisma.UserUpdateInput) => {
        mutateUserCache({ ...user, ...userUpdates } as User, false)

        const { data } = await axios.patch('/api/user', { ...userUpdates })

        if (!data.error) {
            showSuccess('Your account was updated!')
        } else {
            showError(data.error)
        }

        refreshUserCache(false)
    }

    return (
        <Layout title="Account">
            <AdministerNameForm name={user.name} updateName={handleUpdateUser} maxLength={32} />
            <AdministerAvatarForm
                avatar={user.avatar}
                updateAvatar={handleUpdateUser}
                defaultAvatar={'/default_avatar.jpg'}
            />
            <LogoutForm />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = getAuthenticatedServerSideProps(async (_, session) => {
    return {
        props: {
            user: (await GetUser(session.user.id)) as SafeUser,
        },
    }
})

export default AccountPage
