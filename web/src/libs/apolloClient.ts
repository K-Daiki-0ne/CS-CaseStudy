'use client';

import { 
  ApolloClient, 
  HttpLink, 
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client';
import 'cross-fetch/polyfill';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql'
    }),
    cache: new InMemoryCache(),
  })
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if(typeof window === 'undefined') return _apolloClient;

  if(!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}