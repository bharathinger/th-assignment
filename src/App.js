import Podcasts from "./components/podcasts";
import { Box } from '@chakra-ui/react';
function App() {
  return (
    <>
      <Box
        display="flex" justifyContent="space-between" flexDirection="column"
      // fontSize={['sm', 'md', 'lg', 'xl']}
      // p={[2, 4, 6, 8]}
      // mt={[2, 4, 6, 8]}
      >
        <Podcasts />
      </Box>
    </>

  );
}

export default App;
