/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    xl: '5rem',
                    '2xl': '6rem',
                },
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            colors: {
                black: '#000',
                white: '#fff',
                gray: {
                    200: '#F4F4F4',
                    300: '#E8E8E8',
                    400: '#D1D1D1',
                    500: '#A3A3A3',
                    600: '#767676',
                    700: '#484848',
                    800: '#313131',
                    900: '#1A1A1A',
                },
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
