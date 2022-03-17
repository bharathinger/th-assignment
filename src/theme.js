import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#001315',
        margin: '0 auto',
      },
    },
  },
  colors: {
    th: {
      'teal': '#003238',
      'orange': '#ff8615',
      'grey': '#989898',
      'lightBlack': '#333333',
      'popTeal': '#00FC45',
      'paleOrange': '#ff8615',
      'whiteTeal': '#BDD4D6',
    },
  }
})
