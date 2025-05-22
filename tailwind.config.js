/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: '480px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
            maxWidth: {
                desktop: "1228px",
                tablet: "728px",
                mobile: "320px",
            },
            fontFamily: {
                inter: ['var(--font-inter)', 'sans-serif'],
                lora: ['var(--font-lora)', 'serif'],
                lobster: ['var(--font-lobster)', 'cursive'],
                kaushan: ['var(--font-kaushan)', 'cursive'],
            },
            keyframes: {
                sizeUp: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                },
            },
            animation: {
                sizeUp: 'sizeUp 0.8s ease-out',
            },
            colors: {
                bg: 'var(--color-bg)',
                error: 'var(--color-error)',
                success: 'var(--color-success)',
                gray: 'var(--color-gray)',
                black: 'var(--color-black)',
                red: 'var(--color-red)',
            },
        },
    },
};
