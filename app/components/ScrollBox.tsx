import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
// const vendorPrefixScrollBar = {
//   '::-webkit-scrollbar': {
//     display: 'none',
//   },
//   '::-moz-scrollbar': {
//     display: 'none',
//   },
//   '::-ms-scrollbar': {
//     display: 'none',
//   },
//   '::-o-scrollbar': {
//     display: 'none',
//   },
// };
export default function ScrollBox({ children }: LayoutProps) {
  return (
    <>
      <Box
        style={{ overflowY: 'auto', maxHeight: '700px' }}
        sx={{ '::-webkit-scrollbar': { display: 'none' } }}
      >
        {children}
      </Box>
    </>
  );
}
