import React, { useRef, useState } from "react";
import { useFrame, extend, Canvas } from "@react-three/fiber";
import { ARButton, useXR, XR } from "@react-three/xr";
import * as THREE from "three";

extend({});

function Painter() {
  const [isPainting, setIsPainting] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const brushRef = useRef<THREE.Mesh>(null);

  //   useXRFrame(({ session }) => {
  //     if (isPainting) {
  //       const brushPos = brushRef.current.getWorldPosition(new THREE.Vector3())
  //       const brushQuat = brushRef.current.getWorldQuaternion(new THREE.Quaternion())
  //       const paintEvent = new CustomEvent('paint', {
  //         detail: { color, position: brushPos, quaternion: brushQuat }
  //       })
  //       session.dispatchEvent(paintEvent)
  //     }
  //   })

  useFrame(() => {
    console.log("hamed", isPainting);
    if (isPainting) {
      if (brushRef.current) {
        const brushPos = new THREE.Vector3(); // Neue Vector3-Instanz erstellen
        const brushQuat = new THREE.Quaternion(); // Neue Quaternion-Instanz erstellen

        brushRef.current.getWorldPosition(brushPos); // getWorldPosition-Methode auf Ref-Objekt anwenden
        brushRef.current.getWorldQuaternion(brushQuat); // getWorldQuaternion-Methode auf Ref-Objekt anwenden
        // socket.emit("paint", {
        //   id: socket.id,
        //   color,
        //   position: brushPos,
        //   quaternion: brushQuat,
        // });
      }
    }
  });

  const handlePaintStart = () => {
    setIsPainting(true);
  };

  const handlePaintEnd = () => {
    setIsPainting(false);
  };

  return (
    <mesh
      ref={brushRef}
      onPointerDown={handlePaintStart}
      onPointerUp={handlePaintEnd}
    >
      <sphereBufferGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function App() {
  //   const handlePaint = (event: { detail: { color: any; position: any; quaternion: any; }; }) => {
  //     const { color, position, quaternion } = event.detail
  //     const brushPos = new THREE.Vector3().copy(position)
  //     const brushQuat = new THREE.Quaternion().copy(quaternion)
  //     if (brushRef.current) {

  //         brushRef.current.position.copy(brushPos)
  //         brushRef.current.quaternion.copy(brushQuat)
  //         brushRef.current.material.color.set(color)
  //     }
  //   }

  //   const brushRef = useRef<THREE.Mesh>(null);

  return (
    <>
      <ARButton></ARButton>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <XR>
          <Painter />
          {/* <mesh onPaint={handlePaint}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh> */}
        </XR>
      </Canvas>
    </>
  );
}

export default App;
