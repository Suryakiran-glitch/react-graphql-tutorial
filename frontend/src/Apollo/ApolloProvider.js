import React from 'react'
import App from "../App";
import {ApolloClient , ApolloProvider , createHttpLink , InMemoryCache} from '@apollo/client'
import {setContext} from 'apollo-link-context'
import cookie from 'js-cookie'

const httpLink = createHttpLink({
 uri : "http://localhost:5000"
})

const authLink = setContext(() => {
 const token = cookie.get('token')
 return {
  headers : {
   Authorization : token ? `Bearer ${token}` : ''
  }
 }
})

const client = new ApolloClient({
 link : authLink.concat(httpLink),
 cache : new InMemoryCache()
})

export default (
 <ApolloProvider client={client}>
  <App />
 </ApolloProvider>
)


