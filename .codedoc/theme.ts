import { createTheme } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#1E5F74',
    background: '#fff9f2',
  },
  dark: {
    primary: '#fcdab7',
    background: '#1D2D50',
    border: '#133b5c'
  },
  toc: {
    dark: {
      background: '#1D2D50'
    },
    light: {
      background: '#fff9f2',
    }
  },
  quote: {
    dark: {
      background: '#133b5c',
      border: '#1e5f74'
    },
    light: {
      background: '#ffeedd',
      border: '#fcdab7'
    }
  },
  code: {
    wmbar: false,
    light: {
      shadow: 'none',
      background: '#1D2D50',
      lineHighlight: '#133b5c',
      lineHover: '#133b5c',
    },
    dark: {
      shadow: 'none',
      background: '#152543',
      lineHighlight: '#133b5c',
      lineHover: '#133b5c',
    }
  }
});
