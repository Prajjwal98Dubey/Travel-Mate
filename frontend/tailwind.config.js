// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.js"
//   ],
//   theme: {
//     extend: {
      
//     },
//   },
//   plugins: [],
  
// }
// tailwind.config.js

// module.exports = {
//   content: [
//     "./src/**/*.js",
//     // Add other file paths as needed for your project
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         slideInLeft: {
//           '0%': {
//             transform: 'translateX(-100%)',
//           },
//           '100%': {
//             transform: 'translateX(0)',
//           },
//         },
//       },
//       animation: {
//         slideInLeft: 'slideInLeft 0.5s ease-in-out',
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [
//     // Add any plugins you want to use
//     // Example: require('@tailwindcss/forms'),
//   ],
// }

// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.js",
    // Add other file paths as needed for your project
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        slideOutLeft: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },

      },
      animation: {
        slideInLeft: 'slideInLeft 0.5s ease-in-out',
        slideOutLeft: 'slideOutLeft 0.5s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // Add any plugins you want to use
    // Example: require('@tailwindcss/forms'),
  ],
}

