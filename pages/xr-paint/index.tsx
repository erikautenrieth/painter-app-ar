import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Painter1 from "./painter1";


const PaintXR = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const lightRef = useRef<THREE.HemisphereLight>(null);
  const init = () => {
    if (cameraRef.current) {
      cameraRef.current.fov = 70;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.near = 0.01;
      cameraRef.current.far = 20;
    }

    window.addEventListener("resize", onWindowResize);
  };

  const onWindowResize = () => {
    if (cameraRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
    }
  };
  useEffect(() => {
    init();
  });
  return (
    <div className="containerCanva">
      <ARButton></ARButton>
      <Canvas>
        <XR>
          <PerspectiveCamera ref={cameraRef}></PerspectiveCamera>
          <hemisphereLight
            args={["0xffffff", "0xbbbbff", 1]}
            ref={lightRef}
          ></hemisphereLight>
          {/* <Painter></Painter> */}

          <Painter1></Painter1>
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
