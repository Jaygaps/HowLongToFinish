import React from "react";
import type { AppProps } from "next/app";
import ThemeProvider from "../components/ThemeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <ThemeProvider>{loaded && <Component {...pageProps} />}</ThemeProvider>
  );
}

export default MyApp;
