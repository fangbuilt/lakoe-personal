import type { CSS as StitchesCss } from '@stitches/react';
import { createStitches as createCss } from '@stitches/react';
export type { VariantProps as StitchesVariants } from '@stitches/react';

const stitches = createCss({
  theme: {
    space: {
      xs: '8px',
      sm: '12px',
      md: '24px',
      lg: '36px',
      xl: '48px',
      xxl: '86px',
      xxxl: '108px',
      xxxxl: '156px',
    },
  },
  utils: {
    p: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: any) => ({
      paddingTop: value,
    }),
    pr: (value: any) => ({
      paddingRight: value,
    }),
    pb: (value: any) => ({
      paddingBottom: value,
    }),
    pl: (value: any) => ({
      paddingLeft: value,
    }),
    px: (value: any) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: any) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: any) => ({
      marginTop: value,
    }),
    mr: (value: any) => ({
      marginRight: value,
    }),
    mb: (value: any) => ({
      marginBottom: value,
    }),
    ml: (value: any) => ({
      marginLeft: value,
    }),
    mx: (value: any) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: any) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
});

export type CSS = StitchesCss<typeof stitches>;

export const { css } = stitches;
