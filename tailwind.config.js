/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./build/*.html', './build/js/*.js'],
	theme: {
		extend: {
			colors: {
				lightBlue: '#B0D3FF',
				blue: '#3690FF',
				pink: '#FF56F6',
				green: '#03372A',
			},
		},
		screens: {
			xs: '350px',
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			poppins: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [],
};
