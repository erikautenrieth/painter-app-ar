import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Canvas, useFrame } from "@react-three/fiber";

const Model = ({ url }: { url: string }) => {
  const modelRef = useRef<any>();
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    new FBXLoader().load(url, (object) => {
      object.scale.set(2.5, 2.5, 2.5);
      object.position.set(0, -3, 0);
      // Farbe des Modells ändern
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.color.set(0x8b5e3c);
        }
      });
      setModel(object);
    });
  }, [url]);

  useFrame((state: any, delta: number) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return model ? <primitive object={model} ref={modelRef} /> : null;
};

const Playerpicture = ({ name }: { name: string }) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[20, 20, 20]} />
      <Model url={`/models/${name}.fbx`} />
    </Canvas>
  );
};

export default Playerpicture;
