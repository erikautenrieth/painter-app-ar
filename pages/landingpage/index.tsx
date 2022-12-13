import Footer from "components/landingpage/Footer";
import Navbar from "components/landingpage/Navbar";
import NavbarSmall from "components/landingpage/NavbarSmall";
import ResourceHighlight from "components/landingpage/ResourceHighlight";
import Newsletter from "components/landingpage/Newsletter";
import ResourceList from "components/landingpage/ResourceList";

import Head from "next/head";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const goToPage = (url: any) => {
    router.push(url);
  };
  return (
    <>
      <Head>
        <title>Real Chat App</title>
        <link rel="icon" href="/message_draw_icon.ico" />
      </Head>

      <Navbar />
        <NavbarSmall />
      <ResourceHighlight />
      <ResourceList />
      <Newsletter />
      <Footer />
    </>
  );
}
