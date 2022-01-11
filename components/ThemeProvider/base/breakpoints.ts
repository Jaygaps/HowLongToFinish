const breakpoints = {
  mobile: 360,
  largeMobile: 480,
  tablet: 756,
  desktop: 1024,
  largeDesktop: 1280,
};

export type Breakpoint = keyof typeof breakpoints;

export default breakpoints;
