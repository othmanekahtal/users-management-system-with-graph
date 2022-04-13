import React from 'react'
import ReactDOM from 'react-dom'
import toast, {Toaster} from 'react-hot-toast'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import Views from './views/views'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  from,
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error'
import Provider from './context/provider'
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path, extensions}) => {
      if (extensions.code === 'UNAUTHENTICATED') {
        toast.error('You are not authorized to view this page')
      } else {
        toast.error(`${message}`)
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    })

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    toast.error(`Network error ${networkError.message}`)
  }
})
const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
})
ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <ApolloProvider client={client}>
        <Toaster />
        <BrowserRouter>
          <Views />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
