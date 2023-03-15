import { Box, Environment } from "@react-three/drei";
import { Canvas, useFrame, useStore, useThree } from "@react-three/fiber";
import {
  ARButton,
  Controllers,
  Interactive,
  useXR,
  useXREvent,
  VRButton,
  XR,
  XRControllerEvent,
  XREvent,
  XRInteractionType,
} from "@react-three/xr";
import React, { useCallback, useState } from "react";

function Scene() {
  const { gl, camera } = useThree();
  const [store, setStore] = useState<boolean>(false);
  // useXREvent("select", (event) => {
  //   console.log("hamedkabir  camera ", camera.position);

  //   const x = event.target.controller.position.x;
  //   const y = event.target.controller.position.x;
  //   console.log(`Clicked at (${x}, ${y})`);
  // });
  useXREvent("selectstart", (event) => {
    console.log("hamedkabir ", event);
  });

  useXREvent("selectend", (event) => {
    console.log("Select end");
    setStore(false);
  });

  useFrame(() => {
    if (store) {
      console.log("Selecting...");
      // Do something while selecting...
    }
  });

  return (
    <>
      {/* <mesh>
        <boxBufferGeometry />
        <meshStandardMaterial color="orange" />
      </mesh> */}
    </>
  );
}

export default function () {
  return (
    <>
      <ARButton onError={(e) => console.error(e)} />
      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Scene />
          <Controllers></Controllers>
        </XR>
      </Canvas>
    </>
  );
}
