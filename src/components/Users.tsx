import React from 'react'
import { gql, useQuery } from '@apollo/client'

const USERS_QUERY = gql`
    query getUsers {
        users {
            id
            name
        }
    }
`

interface User {
    name: string
    id: string
}

interface GetUserQuery {
    users: User[]
}

export const Users = () => {
    const { data, error, loading } = useQuery<GetUserQuery>(USERS_QUERY)
    // ..

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error || !data) {
        return <h1>You have a some error - {error?.message}</h1>
    }
    return (
        <div>
            {data.users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    )
}
