import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter} from 'react-router-dom'

const client = new ApolloClient({
    uri: 'http://localhost:4000',
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
