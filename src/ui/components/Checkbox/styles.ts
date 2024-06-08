import { css } from '@emotion/react';

// TODO transfer these to tailwind in src/ui/components/Checkbox/index.tsx
export const CHECKBOX_WRAP = (checked?: boolean) =>
  css({
    ':focus': {
      outline: 'none',
      boxShadow: 'none',
      '> span': {
        backgroundColor: '#70747c',
        border: '1px solid #fff'
      }
    },
    ':hover': {
      '> span': {
        backgroundColor: checked ? '#33a571' : '#70747c'
      }
    }
  });
