import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Redirect } from 'react-router-dom'

const ME_QUERY = gql`
    query getMe {
        me {
            id
            name
        }
    }
`

interface User {
    name: string
    id: string
}

interface GetMeQuery {
    me: User
}

interface PropsType {
    children?: React.ReactNodeArray | React.ReactNode
}

export const IsAuthenticated: React.FC<PropsType> = ({ children }) => {
    const { data, error, loading } = useQuery<GetMeQuery>(ME_QUERY)

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (!data?.me) {
        return <Redirect to={{ pathname: '/landing' }} />
    }

    return <React.Fragment>{children}</React.Fragment>
}
