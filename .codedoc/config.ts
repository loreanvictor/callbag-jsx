
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
  dest: {
    namespace: '/callbag-jsx',
    html: 'dist',
    assets: process.env.GITHUB_BUILD === 'true' ? 'dist' : '.',
    bundle: process.env.GITHUB_BUILD === 'true' ? 'bundle' : 'dist/bundle',
    styles: process.env.GITHUB_BUILD === 'true' ? 'styles' : 'dist/styles',
  },
  page: {
    title: {
      extractor: (content) => {
        const base = 'Callbag JSX';
        const pt = content.querySelector('h1')?.textContent;

        return pt ? `${base} | ${pt}` : base;
      }
    },
    favicon: '/favicon.ico'
  },
  misc: {
    github: {
      user: 'loreanvictor',
      repo: 'callbag-jsx',
    }
  },
});
