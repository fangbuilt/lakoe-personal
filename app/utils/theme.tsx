import { extendTheme } from '@chakra-ui/react';
import { switchTheme } from './switchTheme';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    lakoeCyan: '#0086B4',
    lakoeCyanMuted: '#C5F8FF',
  },
  fonts: {
    heading: "'Plus Jakarta Sans', sans-serif;",
    body: "'Plus Jakarta Sans', sans-serif;",
  },
  components: { Switch: switchTheme },
  styles: {
    global: {
      '.pac-container': {
        zIndex: 1500,
      },
    },
  },
});

export default extendTheme(theme);
