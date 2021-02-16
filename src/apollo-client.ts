import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ConnectionParams } from 'subscriptions-transport-ws';
import { ref, watch } from 'vue';

import { getContext } from '@/graphql/api';

export const xAuthToken = ref<string | null>(null);

const httpUri = process.env.VUE_APP_GRAPHQL_URI_HTTP;
const httpLink = new HttpLink({ uri: httpUri });

function resolveWithValueNotNull(resolve: (value?: ConnectionParams) => void) {
  return (value: string | null) => {
    if (value !== null) {
      resolve(getContext(value));
    }
  };
}

const wsUri = process.env.VUE_APP_GRAPHQL_URI_WS as string;
const options = {
  lazy: true,
  reconnect: true,
  connectionParams: async () => new Promise<ConnectionParams>(resolve => {
    const r = resolveWithValueNotNull(resolve);
    r(xAuthToken.value);
    watch(xAuthToken, value => r(value));
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
