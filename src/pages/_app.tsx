import { theme } from "@/styles/theme";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: "pink" },
          }}
        />
        <Component {...pageProps} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
