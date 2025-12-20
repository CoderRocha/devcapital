export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#5BA32C',
            foreground: '#FFFFFF',
          },
          secondary: {
            DEFAULT: '#F7F7F7',
            foreground: '#000000',
          },
          onp: {
            green: {
              DEFAULT: '#5BA32C',
              dark: '#4A8A24',
              darker: '#3D7220',
              light: '#7BC04A',
              lighter: '#E8F5E0',
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