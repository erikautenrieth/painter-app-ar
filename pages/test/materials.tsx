import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import { OrbitControls, useTexture } from "@react-three/drei";
import Lights from "./components/Lights";
import Ground from "./components/Ground";
import Palm2 from "./components/PalmV2";
import MyPlayer from "./components/Player";

const TexturedSpheres = () => {
  const props = useTexture({
    map: "/textures/rocky_trail_diff_1k.png",
    displacementMap: "/textures/rocky_trail_disp_1k.png",
    normalMap: "/textures/rocky_trail_nor_gl_1k.png",
    roughnessMap: "/textures/rocky_trail_rough_1k.png",
  });
  const props2 = useTexture({
    map: "/textures3/rocks_ground_01_diff_1k.png",
    normalMap: "/textures3/rocks_ground_01_nor_gl_1k.png",
    roughnessMap: "/textures3/rocks_ground_01_rough_1k.png",
  });

  return (
    <>
      {/* <TransformControls></TransformControls> */}
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[1, 100, 100]}></sphereGeometry>
        <meshStandardMaterial
          {...props2}
          displacementScale={0.1}
        ></meshStandardMaterial>
      </mesh>
    </>
  );
};

const Materials: NextPage = () => {
  return (
    <div className="containerCanva">
      <Canvas shadows>
        {/* <Canvas shadows camera={{ position: [0, 10, 0] }}> */}
        <gridHelper args={[10, 10]}></gridHelper>
        <OrbitControls></OrbitControls>
        {/* <TexturedSpheres></TexturedSpheres> */}
        {/* <PalmModel></PalmModel> */}
        <Palm2 boundary={25} count={20}></Palm2>
        <MyPlayer></MyPlayer>
        <Lights></Lights>
        <Ground></Ground>
      </Canvas>
    </div>
  );
};
export default Materials;
