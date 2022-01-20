const breakpoints = {
  mobile: "360px",
  largeMobile: "480px",
  tablet: "756px",
  desktop: "1024px",
  largeDesktop: "1280px",
};

export type Breakpoint = keyof typeof breakpoints;

export default breakpoints;
