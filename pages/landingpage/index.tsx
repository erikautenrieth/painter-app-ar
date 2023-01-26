import * as THREE from "three";
import { Scene } from "three";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Navbar from "components/landingpage/Navbar";
// @ts-ignore
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import Background from "../../components/landingpage/Background";
import TextSection from "../../components/landingpage/TextSection";

import Box from "../../components/landingpage/Box";
import AnimatedSphere from "../../components/landingpage/AnimatedSphere";
import Iphone from "../../components/landingpage/Iphone";
import Footer from "../../components/landingpage/Footer";
import Head from "next/head";
import Newsletter from "../../components/landingpage/Newsletter";
import { useRouter } from "next/router";
import Sidemenu from "shared-components/components/Sidemenu";

export default function Landingpage() {
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

      <Wrapper className="App">
        <Background />
        {/* <Navbar/> */}
        <Sidemenu></Sidemenu>
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
