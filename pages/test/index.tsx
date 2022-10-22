import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import * as THREE from "three";
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
    <div className="container">
      <ARButton
        /**
         * `XRSession` configuration options
         * @see https://immersive-web.github.io/webxr/#feature-dependencies
         */
        sessionInit={{
          optionalFeatures: [
            "local-floor",
            "bounded-floor",
            "hand-tracking",
            "layers",
          ],
        }}
        /** Whether this button should only enter an `XRSession`. Default is `false` */
        enterOnly={false}
        /** Whether this button should only exit an `XRSession`. Default is `false` */
        exitOnly={false}
      ></ARButton>
      <Canvas>
        <XR>
          <Controllers></Controllers>
          <Hands></Hands>
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
