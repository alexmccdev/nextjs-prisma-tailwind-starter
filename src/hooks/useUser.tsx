import useSWR, { SWRConfiguration, trigger } from 'swr'

const useUser = (options: SWRConfiguration) => {
    const ENDPOINT = '/api/user'

    const { data: user, mutate: mutateUserCache, error } = useSWR(ENDPOINT, options)

    const loading = user === undefined && !error
    const refreshUserCache = async (shouldRevalidate?: boolean) => await trigger(ENDPOINT, shouldRevalidate)

    return {
        loading,
        error,
        user,
        mutateUserCache,
        refreshUserCache,
    }
}

export default useUser
