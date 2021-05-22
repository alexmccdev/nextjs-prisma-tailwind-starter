const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: defaultTheme.fontFamily.sans,
                serif: defaultTheme.fontFamily.serif,
            },
            colors: {
                primary: colors.blue[800],
                secondary: colors.blue[500],
                success: colors.green[500],
                warn: colors.yellow[500],
                error: colors.red[500],
            },

            minWidth: (theme) => ({
                ...theme('spacing'),
            }),

            minHeight: (theme) => ({
                ...theme('spacing'),
            }),
            inset: (theme, { negative }) => ({
                auto: 'auto',
                ...theme('spacing'),
                ...negative(theme('spacing')),
            }),
        },
    },
    variants: {
        extend: {
            cursor: ['hover', 'focus'],
        },
    },
    plugins: [],
}
