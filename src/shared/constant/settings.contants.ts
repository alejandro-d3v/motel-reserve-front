export const settings = {
  appName: import.meta.env.VITE_APP_NAME,
  appLogo: import.meta.env.VITE_APP_LOGO,
  appFavicon: import.meta.env.VITE_APP_FAVICON,
  appFilterNameOnLocalStorage: 'filters',

  colors: {
    primary: import.meta.env.VITE_COLOR_PRIMARY as string,
    secondary: import.meta.env.VITE_COLOR_SECONDARY as string,
  },
};