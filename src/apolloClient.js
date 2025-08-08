import { ApolloClient, InMemoryCache, from, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { CONFIG } from './constants';

// HTTP Link
const httpLink = createHttpLink({
  uri: CONFIG.GRAPHQL_ENDPOINT,
});

// Error Link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchModels: {
          // Cache separate results for different search terms
          keyArgs: ['brandId', 'name', 'type'],
        },
      },
    },
  },
});

// Create Apollo Client
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;
