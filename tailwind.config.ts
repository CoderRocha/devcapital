export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#006AFF',
            foreground: '#FFFFFF',
          },
          secondary: {
            DEFAULT: '#F7F7F7',
            foreground: '#000000',
          },
          onp: {
            blue: {
              DEFAULT: '#006AFF',
              dark: '#0052CC',
              darker: '#003D99',
              light: '#4A90E2',
              lighter: '#E3F2FD',
            },
            gray: {
              dark: '#222222',
              light: '#F7F7F7',
              border: '#E0E0E0',
            },
          },
        },
      },
    },
    plugins: [],
};