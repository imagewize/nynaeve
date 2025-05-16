/**
 * Tailwind CSS configuration file for Imagewize WordPress theme
 * 
 * This configuration ensures that:
 * 1. All Tailwind utilities are generated for Theme CSS and block editor
 * 2. Custom font weights for Open Sans are properly defined
 * 3. Theme variables from app.css are available in Tailwind
 */

export default {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.js',
    './resources/js/**/*.jsx',
    './app/**/*.php',
  ],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'menlo': ['Menlo', 'monospace'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontSize: {
        'xs': 'var(--wp--preset--font-size--xs, 0.75rem)',
        'sm': 'var(--wp--preset--font-size--sm, 0.875rem)',
        'base': 'var(--wp--preset--font-size--base, 1rem)',
        'lg': 'var(--wp--preset--font-size--lg, 1.125rem)',
        'xl': 'var(--wp--preset--font-size--xl, 1.25rem)',
        '2xl': 'var(--wp--preset--font-size--2xl, 1.5rem)',
        '3xl': 'var(--wp--preset--font-size--3xl, 1.875rem)',
        '4xl': 'var(--wp--preset--font-size--4xl, 2.25rem)',
        '5xl': 'var(--wp--preset--font-size--5xl, 3rem)',
        '6xl': 'var(--wp--preset--font-size--6xl, 3.75rem)',
        '7xl': 'var(--wp--preset--font-size--7xl, 4.5rem)',
        '8xl': 'var(--wp--preset--font-size--8xl, 6rem)',
        '9xl': 'var(--wp--preset--font-size--9xl, 8rem)',
      },
      colors: {
        'ash-gray': 'var(--color-ash-gray, #98999a)',
        'mist-gray': 'var(--color-mist-gray, #ebeced)',
        'fog-gray': 'var(--color-fog-gray, #cbcbcb)',
        'sky-blue': 'var(--color-sky-blue, #017cb6)',
        'ocean-blue': 'var(--color-ocean-blue, #026492)',
        'midnight-blue': 'var(--color-midnight-blue, #02567e)',
        'graphite-black': 'var(--color-graphite-black, #171b23)',
        'steel-gray': 'var(--color-steel-gray, #465166)',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
