/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // backgroundImage: {
      //   "my-image": "url(/images/background.jpg)",
      // },
      height: {
        page: "calc(100% - 80px)",
      },
      fontFamily: {
        custom: ["Poppins"],
      },
    },
  },
  plugins: [],
};
