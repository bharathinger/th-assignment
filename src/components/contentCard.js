import { Text, Box, Image } from '@chakra-ui/react';

const getUri = (uri) => {
  return uri.replace('/uploads/', '/resize/200x/uploads/')
}

const ContentCard = ({ name, image, categories, experts }) => {
  return (
    <Box borderRadius={'md'} mt={4} background={'white'} >
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
  )
}

export default ContentCard;