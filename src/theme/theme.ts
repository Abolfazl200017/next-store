import { Components, createTheme, CssVarsTheme, PaletteOptions, responsiveFontSizes, Theme } from '@mui/material/styles';

const themeComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#FFF3E3",
          color: 'black',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "&.Mui-selected": {
          backgroundColor: "#FFF3E3",
          color: 'black',
          "&:hover": {
            backgroundColor: "#B88E2F",
            color: "#fff",
          },
        },
      },
    },
  },
};

const themePalette: PaletteOptions = {
  primary: {
    main: '#B88E2F',
    light: '#B88E2F',
    dark: '#1565c0',
  },
  secondary: {
    main: '#FFF3E3',
    light: '#FFF3E3',
    dark: '#7b1fa2',
  },
  mode: 'light',
  background: {
    default: '#ffffff'
  }
};

let theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Shabnam',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
  },
  palette: themePalette,
  components: themeComponents as Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>,
  cssVariables: true,
});

theme = responsiveFontSizes(theme);

export { theme };