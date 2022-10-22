import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Navbar from "../shared-components/navbar";
import { AuthContextProvider } from "../shared-components/services/auth-context";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      {/* <Navbar>
      </Navbar> */}
    </AuthContextProvider>
  );
}

export default MyApp;
