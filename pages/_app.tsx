import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DataWrapper } from "../components/common/DataContext/DataContext";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <DataWrapper>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </DataWrapper>
  );
}

export default MyApp;
