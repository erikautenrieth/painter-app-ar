import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import {
  OrbitControls,
  useTexture,
  TransformControls,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import Lights from "./components/Lights";
import Ground from "./components/Ground";
import PalmModel from "./components/Palm";
import Palm2 from "./components/PalmV2";
import { useEffect, useRef } from "react";
import { MeshDistanceMaterial } from "three";
import { useInput } from "./hooks/useInput";

const MyPlayer = () => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const model = useGLTF("/models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  const currentAction = useRef("");
  // animations dance, idle, jump, running
  useEffect(() => {
    let action = "";

    if (forward || backward || left || right) {
      action = "running";
    } else if (jump) {
      action = "jump";
    } else if (shift) {
      action = "dance";
    } else {
      action = "idle";
    }
    // actions?.dance?.play();
    // console.log("forward  ", forward);
    // console.log("backward  ", backward);
    // console.log("left   ", left);
    // console.log("right   ", right);
    // console.log("jump   ", jump);
    // console.log("shift   ", shift);
    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, jump, shift]);

  return <primitive object={model.scene}></primitive>;
};

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
    <div className="container">
      <Canvas shadows>
        {/* <Canvas shadows camera={{ position: [0, 10, 0] }}> */}
        <gridHelper args={[10, 10]}></gridHelper>
        <OrbitControls></OrbitControls>
        {/* <TexturedSpheres></TexturedSpheres> */}
        {/* <PalmModel></PalmModel> */}
        <Palm2 boundary={50} count={20}></Palm2>
        <MyPlayer></MyPlayer>
        <Lights></Lights>
        <Ground></Ground>
      </Canvas>
    </div>
  );
};
export default Materials;
