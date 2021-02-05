import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpUri = process.env.VUE_APP_GRAPHQL_URI_HTTP;
const httpLink = new HttpLink({ uri: httpUri });

const wsUri = process.env.VUE_APP_GRAPHQL_URI_WS as string;
const options = { reconnect: true };
const wsLink = new WebSocketLink({ uri: wsUri, options });

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      (definition.kind === 'OperationDefinition')
      && (definition.operation === 'subscription')
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

export default new ApolloClient({ link, cache });
