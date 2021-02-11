import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ref, watch } from 'vue';

export const xAuthToken = ref<string | null>(null);

const httpUri = process.env.VUE_APP_GRAPHQL_URI_HTTP;
const httpLink = new HttpLink({ uri: httpUri });

const wsUri = process.env.VUE_APP_GRAPHQL_URI_WS as string;
const options = {
  lazy: true,
  reconnect: true,
  connectionParams: async () => new Promise<any>((resolve, /*reject*/) => {
    if (xAuthToken.value !== null) {
      resolve({
        headers: { 'x-auth-token': xAuthToken.value },
      });
    }
    watch(xAuthToken, value => {
      if (value !== null) {
        resolve({
          headers: { 'x-auth-token': value },
        });
      }
    });
  }),
};
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
