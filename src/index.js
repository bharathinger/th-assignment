import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme';
import { TH_GRAPHQL_ENDPOINT } from './constants'

const client = new ApolloClient({
	uri: TH_GRAPHQL_ENDPOINT,
	cache: new InMemoryCache()
});



ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

