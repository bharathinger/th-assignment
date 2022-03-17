import React, { useState, useEffect } from 'react';
import {
  useLazyQuery,
} from "@apollo/client";
import useDebounce from '../hooks/useDebounce';
import { PODCASTS } from '../graphql/queries';
import { Text, Input, Box, Image } from '@chakra-ui/react';
import Loader from './loader';

const LIMIT = 20;


const Podcasts = () => {

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
  const getUri = (uri) => {
    return uri.replace('/uploads/', '/resize/200x/uploads/')
  }

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
        <Box height={'calc(100% - 124px)'} top={'5rem'} overflow='auto' position={'fixed'} p={5}>
          {content?.length > 0 ? content.map(({ id, name, image, categories, experts }) => (
            <Box key={id} borderRadius={'md'} mt={4} background={'white'} >
              <Image src={getUri(image.uri)} style={{ height: '40vw', width: '100%' }} borderTopRadius={'md'} alt={image.originalName} objectFit='cover' loading='lazy' />
              <Text color={'th.orange'} casing={'uppercase'} mt={2} ml={2} fontWeight={600} fontSize={'sm'} >
                {categories[0]?.name}
              </Text>
              <Text ml={2} mt={1} fontSize={'lg'} fontWeight={700}>
                {name}
              </Text>
              <Text color={'th.lightBlack'} ml={2} mt={2} fontSize={'sm'} fontWeight={700}>{`${experts[0].firstName} ${experts[0].lastName}`}</Text>
              <Text color={'th.lightBlack'} ml={2} fontSize={'sm'} fontWeight={500}>{experts[0].title}</Text>
              <Text color={'th.orange'} ml={2} pb={5} fontSize={'sm'} fontWeight={600}>{experts[0].company}</Text>

            </Box>
          )) : <Text color='th.orange' fontSize={'md'} align={'center'}>No records found :(</Text>}
        </Box>
      }
    </>
  );
}

export default Podcasts;