import React, { useContext } from 'react'
import useSWR from 'swr'

const UserContext = React.createContext({ user: null, loading: false })

const UserProvider = (props) => {
    const { data: user } = useSWR('/api/user')
    return <UserContext.Provider value={{ user, loading: typeof user === 'undefined' }} {...props} />
}

const useUser = () => {
    return useContext(UserContext)
}

export { UserProvider, useUser }
