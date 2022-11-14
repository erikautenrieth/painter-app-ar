
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../shared-components/services/auth-context";
import ProtectedRoute from "../shared-components/protected-route";

// Styles
import "bulma/css/bulma.min.css";
import "../styles/globals.css";
import "../styles/main.scss";

const noAuthRequired = ["/", "/landingpage", "/login", "/xr-paint"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    // <Component {...pageProps} />
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
