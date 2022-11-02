import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import { OrbitControls, useTexture } from "@react-three/drei";
const TexturedSpheres = () => {
  const props = useTexture({
    map: "/textures/rocky_trail_diff_1k.png",
    displacementMap: "/textures/rocky_trail_disp_1k.png",
    normalMap: "/textures/rocky_trail_nor_gl_1k.png",
    roughnessMap: "/textures/rocky_trail_rough_1k.png",
  });
  const props2 = useTexture({
    map: "/textures3/rocks_ground_01_diff_1k.png",
    displacementMap: "/textures3/rocks_ground_01_disp_1k.png",
    normalMap: "/textures3/rocks_ground_01_nor_gl_1k.png",
    roughnessMap: "/textures3/rocks_ground_01_rough_1k.png",
  });

  return (
    <>
      <mesh scale={[1, 1, 1]} position={[0, 1, 0]}>
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
    <div className="container">
      <Canvas>
        <gridHelper args={[10, 10]}></gridHelper>
        <OrbitControls></OrbitControls>
        <ambientLight intensity={0.3}></ambientLight>
        <directionalLight position={[0, 5, 5]}></directionalLight>
        <TexturedSpheres></TexturedSpheres>
      </Canvas>
    </div>
  );
};
export default Materials;
