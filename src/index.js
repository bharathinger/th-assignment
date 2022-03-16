import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useLazyQuery,
	gql
} from "@apollo/client";

const client = new ApolloClient({
	uri: 'https://api.staging.tigerhall.io/graphql',
	cache: new InMemoryCache()
});

const LIMIT = 20;

const PODCASTS = gql`
  query($keyword:  String!, $limit: Int!) {
    contentCards(filter: {limit: $limit, keywords: $keyword, types: [PODCAST]}) {
      edges {
        ... on Podcast {
          id
          name
          image {
  uri }
          categories {
             name
  } experts {
  firstName
    lastName
    title
  company }
        }
      }
    }
  }
`;

function Podcasts() {


	const [query, setQuery] = useState('');
	const debouncedSearchTerm = useDebounce(query, 300);
	const [searchPodcasts, { loading, error, data }] = useLazyQuery(PODCASTS);

	useEffect(() => {
		searchPodcasts({
			variables: { keyword: '', limit: LIMIT }
		});
	}, [searchPodcasts]);


	useEffect(() => {
		searchPodcasts({
			variables: { keyword: debouncedSearchTerm, limit: LIMIT }
		});
	},
		[debouncedSearchTerm, searchPodcasts]
	);

	const content = data?.contentCards?.edges;

	return (
		<>
			<input type="text" name="search" value={query} onChange={(event) => setQuery(event.target.value)} />
			{loading ? <p>Loading...</p> : error ? <p>Error :(</p> : content?.length > 0 ? content.map(({ id, name }) => (
				<div key={id}>
					<p>
						{id}: {name}
					</p>
				</div>
			)) : <p>No records found</p>}
		</>
	);
}


ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
			{/* <SearchPodcasts /> */}
			<Podcasts />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	},
		[value, delay]
	);
	return debouncedValue;
}