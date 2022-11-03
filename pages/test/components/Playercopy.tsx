import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useInput } from "../hooks/useInput";
import * as THREE from "three";
type props = {
  position: { x: number; y: number; z: number };
};

const MyPlayerCopy: React.FC<props> = ({ position }) => {
  const model2 = useGLTF("/models/boy2.glb");

  const { actions } = useAnimations(model2.animations, model2.scene);

  model2.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  useEffect(() => {
    console.log(actions, model2);

    actions?.dance?.play();
  });
  return <primitive object={model2.scene}></primitive>;
};

export default MyPlayerCopy;
