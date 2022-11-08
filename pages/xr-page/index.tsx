import { Box, OrbitControls, Stats, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MeshNormalMaterial, BufferGeometry, BoxGeometry } from "three";
import { io } from "socket.io-client";
import { useInput } from "../../shared-components/services/hooks/useInput";
import { directionOffset } from "../../shared-components/services/player/player.service";
import * as THREE from "three";
import MyBox from "./box";

let rotateQuartenion = new THREE.Quaternion();
const Metaverse = () => {
  return (
    <div className="container">
      {true ? (
        <Canvas camera={{ position: [0, 10, -5], near: 0.1, far: 1000 }}>
          {/* <Canvas> */}
          <Stats />
          <gridHelper rotation={[0, 0, 0]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <OrbitControls></OrbitControls> */}
          <MyBox></MyBox>
        </Canvas>
      ) : null}
    </div>
  );
};

export default Metaverse;
