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

const client = new ApolloClient({
	uri: 'https://api.staging.tigerhall.io/graphql',
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

