/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/Form.js",
  ],
  theme: {
    screens: {
      'sm': '370px',
      'xl': '950px',}
    },
    extend: {
      backgroundImage: {
        'xl-image': "url('./assets/images/bg-sidebar-desktop.svg')",
        'sm-image': "url('./assets/images/bg-sidebar-mobile.svg')",
      },
      fontFamily: {
        UbuntuRegular: ['Ubuntu-Regular', 'sans-serif'],
        UbuntuBold: ['Ubuntu-Bold', 'sans-serif'],
        UbuntuMedium: ['Ubuntu-Medium', 'sans-serif'],
      },
      colors: {
        'marine-blue': 'hsl(213, 96%, 18%)',
        'purplish-blue': 'hsl(243, 100%, 62%)',
        'pastel-blue': 'hsl(228, 100%, 84%)',
        'light-blue': 'hsl(206, 94%, 87%)',
        'strawberry-red': 'hsl(354, 84%, 57%)',
        'cool-gray': 'hsl(231, 11%, 63%)',
        'light-gray': 'hsl(229, 24%, 87%)',
        'magnolia': 'hsl(217, 100%, 97%)',
        'alabaster': 'hsl(231, 100%, 99%)',
        'white': 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
}

