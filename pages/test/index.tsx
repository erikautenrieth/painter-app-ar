import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import {
  VRButton,
  ARButton,
  XR,
  Controllers,
  Hands,
  XRButton,
} from "@react-three/xr";
import * as THREE from "three";

// function makeTextPanel() {
//   const textRef = useRef<THREE.Object3D>(null!);

//   const container = new ThreeMeshUI.Block({
//     width: 1.2,
//     height: 0.5,
//     padding: 0.05,
//     justifyContent: "center",
//     textAlign: "left",
//   });

//   container.position.set(0, 1, -1.8);
//   container.rotation.x = -0.55;

//   //

//   new ThreeMeshUI.Text({
//     content: "This library supports line-break-friendly-characters,",
//     fontSize: 0.055,
//   }),
//     new ThreeMeshUI.Text({
//       content:
//         " As well as multi-font-size lines with consistent vertical spacing.",
//       fontSize: 0.08,
//     });

//   return <object3D ref={textRef}></object3D>;
// }

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const test = () => {
  return (
    <div className="containerCanva">
      <XRButton
        /**
         * `XRSession` configuration options
         * @see https://immersive-web.github.io/webxr/#feature-dependencies
         */
        sessionInit={{
          optionalFeatures: [
            "local-floor",
            "bounded-floor",
            "hand-tracking",
            "local",
            "viewer",
            "unbounded",
          ],
        }}
        /** Whether this button should only enter an `XRSession`. Default is `false` */
        enterOnly={false}
        /** Whether this button should only exit an `XRSession`. Default is `false` */
        exitOnly={false}
        mode={"VR"}
      ></XRButton>
      <Canvas>
        <XR foveation={0} referenceSpace="local-floor">
          <Controllers
            /** Optional material props to pass to controllers' ray indicators */
            rayMaterial={{ color: "blue" }}
            /** Whether to hide controllers' rays on blur. Default is `false` */
            hideRaysOnBlur={false}
          ></Controllers>
          <Hands
            // Optional custom models per hand. Default is the Oculus hand model
            modelLeft="/model-left.glb"
            modelRight="/model-right.glb"
          ></Hands>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, -5]} />
          <Box position={[1.2, 0, -5]} />
        </XR>
      </Canvas>
    </div>
  );
};
export default test;
