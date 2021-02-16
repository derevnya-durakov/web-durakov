import { createApp } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';

import App from '@/App.vue';
import apolloClient from '@/apollo-client';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';

createApp(App)
  .use(store)
  .use(router)
  .provide(DefaultApolloClient, apolloClient)
  .mount('#app');
