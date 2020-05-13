import ApolloClient from 'apollo-boost';
const MAIN_PROXY_URL = "https://node-js-sms-backend-123.herokuapp.com/"

const client = new ApolloClient({
  uri: MAIN_PROXY_URL,
});

export default client;