// apolloClient.ts
import { ApolloClient, HttpLink, from, InMemoryCache, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_API } from '../Constants/url';


// URL del servidor GraphQL
const GRAPHQL_URL = URL_API + 'graphql'; // Usa tu URL real
export const SESSION_COOKIE_KEY = 'your_session_cookie_key'; // Ajusta según tu clave
export const USER_COOKIES_ROLE = "user_cookies_rol"
const loggerLink = new ApolloLink((operation, forward) => {
  console.log(
    `%c📤 GraphQL Request: %c${operation.operationName}`,
    "color: blue; font-weight: bold;",
    "color: black;"
  );

  console.log("Query:");
  console.log(operation.query.loc?.source.body);

  console.log("Variables:");
  console.log(JSON.stringify(operation.variables, null, 2));


  return forward(operation).map((response) => {
    console.log(
      `%c📥 GraphQL Response: %c${operation.operationName}`,
      "color: green; font-weight: bold;",
      "color: black;"
    );

    console.log("Data:");
    console.log(JSON.stringify(response.data, null, 2));

    if (response.errors) {
      console.log("Errors:");
      console.log(JSON.stringify(response.errors, null, 2));
    }

    console.groupEnd();

    return response;
  });
});

// Configuración del enlace HTTP para Apollo Client
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'same-origin', // O usa 'same-origin' si es necesario
});

// Enlace de autenticación para Apollo Client
const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await AsyncStorage.getItem(SESSION_COOKIE_KEY);
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.error('Error al obtener token de AsyncStorage:', error);
    return { headers };
  }
});

// Enlace de manejo de errores
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Configuración del Apollo Client
const client = new ApolloClient({
  link: from([loggerLink,authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
export default client

