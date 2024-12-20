export const COLORS = {
  offwhite: "hsla(51, 64%, 98%, 1)",
  blackblue: {
    300: "hsla(263, 15%, 35%, 1)",
    400: "hsla(263, 15%, 30%, 1)",
    500: "hsla(263, 15%, 25%, 1)",
    600: "hsla(263, 15%, 20%, 1)",
    700: "hsla(263, 15%, 15%, 1)",
  },
  lightblackblue: {
    300: "hsla(263, 15%, 80%, 0.05)",
    400: "hsla(263, 15%, 60%, 0.05)",
    500: "hsla(263, 15%, 40%, 0.05)",
    600: "hsla(263, 15%, 20%, 0.05)",
    700: "hsla(263, 15%, 0%, 0.05)",
  },
};

export const WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const BREAKPOINTS = {
  tabletMin: 550,
  laptopMin: 1100,
  desktopMin: 1500,
};

export const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  tabletOnly: `
    (min-width: ${BREAKPOINTS.tabletMin / 16}rem) and
    (max-width: ${(BREAKPOINTS.laptopMin - 1) / 16}rem)`,
};

export const FAMILIES = {
  sansSerif:
    '"DM Sans", "Helvetica Neue", Helvetica, "Franklin Gothic Medium", "Franklin Gothic", "ITC Franklin Gothic", sans-serif',
};
