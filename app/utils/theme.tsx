import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';

const theme = extendTheme({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
  },
  fonts: {
    heading: "'Plus Jakarta Sans', sans-serif;",
    body: "'Plus Jakarta Sans', sans-serif;",
  },
});

export default theme;
