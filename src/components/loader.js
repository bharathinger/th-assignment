import { Skeleton, Box } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Box borderRadius={'md'} mt={4} background={'white'} p={5}>
      <Skeleton startColor='th.whiteTeal' endColor='th.teal' height='20px' mt={2} />
      <Skeleton startColor='th.paleOrange' endColor='th.orange' height='20px' mt={2} />
      <Skeleton startColor='th.whiteTeal' endColor='th.teal' height='20px' mt={2} />
      <Skeleton startColor='th.paleOrange' endColor='th.orange' height='20px' mt={2} />
    </Box>
  )
}

export default Loader;