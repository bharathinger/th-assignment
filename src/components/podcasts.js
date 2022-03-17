import React, { useState, useEffect } from 'react';
import {
  useLazyQuery,
} from "@apollo/client";
import useDebounce from '../hooks/useDebounce';
import { PODCASTS } from '../graphql/queries';
import { Text, Input, Box } from '@chakra-ui/react';
import Loader from './loader';
import ContentCard from './contentCard';
import { LIMIT, DELAY_IN_MILLISECONDS } from '../constants';


const Podcasts = () => {

  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, DELAY_IN_MILLISECONDS);
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
      <Box position={'sticky'} top='0' zIndex={1} p={5}>
        <Text color={'white'} fontWeight={600}>
          Search
        </Text>
        <Input value={query}
          onChange={(event) => setQuery(event.target.value)}
          background={'th.teal'}
          placeholder='Type any keyword'
          _placeholder={{ color: 'th.grey' }}
          focusBorderColor='th.orange'
          size='md'
          color={'th.grey'}
        />
      </Box>
      {loading ? <><Loader /><Loader /><Loader /></> : error ? <p>Error :(</p> :
        <Box height={'calc(100% - 124px)'} top={'6rem'} overflow='auto' position={'fixed'} p={5}>
          {content?.length > 0 ? content.map(({ id, name, image, categories, experts }) => (
            <ContentCard key={id} name={name} image={image} categories={categories} experts={experts} />
          )) : <Text color='th.orange' fontSize={'md'} align={'center'}>No records found :(</Text>}
        </Box>
      }
    </>
  );
}

export default Podcasts;