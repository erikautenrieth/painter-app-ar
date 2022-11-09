import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Painter1 from "./painter1";

const PaintXR = () => {
  useEffect(() => {});
  return (
    <div className="containerCanva">
      <ARButton></ARButton>
      <Canvas>
        <XR>
          <Painter1></Painter1>
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
