import { createApp } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';

const uri = process.env.VUE_APP_GRAPHQL_URI;
const link = createHttpLink({ uri });
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({ link, cache });

createApp(App)
  .use(store)
  .use(router)
  .provide(DefaultApolloClient, apolloClient)
  .mount('#app');
