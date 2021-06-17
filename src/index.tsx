import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter } from 'react-router-dom'

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
})
const authLink = setContext(async (req, { headers }) => {
    const token = localStorage.getItem('auth_token')
    return {
        ...headers,
        headers: {
            Authorization: token ? `Bearer ${token}` : null,
        },
    }
})

const link = authLink.concat(httpLink)

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'),
)
