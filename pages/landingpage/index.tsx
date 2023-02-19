import Navbar from "shared-components/components/navbar/Navbar";
// @ts-ignore
import styled from "styled-components";
import Background from "../../shared-components/components/landingpage/Background";
import TextSection from "../../shared-components/components/landingpage/TextSection";
import Footer from "../../shared-components/components/landingpage/Footer";
import Head from "next/head";
import Newsletter from "../../shared-components/components/landingpage/Newsletter";
import { useRouter } from "next/router";


export default function Landingpage() {
  const router = useRouter();
  const goToPage = (url: any) => {
    router.push(url);
  };
  return (
    <>
      <Head>
          <title>3D Painter App</title>
              <meta name="description" content="Create stunning 3D art with the 3D Painter App. With a variety of brushes and tools,
                                                 you can paint and sculpt in three dimensions to bring your ideas to life." />
              <meta name="keywords" content="3D art, 3D painting, sculpting, digital art, creative tools, brushes, drawing, modeling" />
              <meta name="author" content="Your Name" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/message_draw_icon.ico" />
      </Head>

      <Wrapper className="App">
        <Background />
          <Navbar />
        <TextSection />
        <Newsletter />
        <Footer />
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  position: relative;
  background: #1f1144;

  canvas {
    height: 500px;
  }
`;
