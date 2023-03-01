import "../src/styles/globals.css";

export const parameters = {
  backgrounds: {
    default: "dark",
    values: [
      {
        name: "dark",
        value: "#333333",
      },
      {
        name: "light",
        value: "#F8F8F8",
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
