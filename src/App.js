import Podcasts from "./components/podcasts";
import { Box } from '@chakra-ui/react';
function App() {
  return (
    <>
      <Box
        display="flex" justifyContent="space-between" flexDirection="column"
      >
        <Podcasts />
      </Box>
    </>

  );
}

export default App;
