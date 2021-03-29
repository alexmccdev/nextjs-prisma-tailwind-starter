import useSWR from 'swr'

const useUser = () => {
    const { data: user } = useSWR('/api/user')
    return { user, loading: typeof user === 'undefined' }
}

export default useUser
