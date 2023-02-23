import React, { useRef, useState, useEffect } from "react";
import { useFrame, extend, Canvas, useThree } from "@react-three/fiber";
import { ARButton, useXR, XR } from "@react-three/xr";
import io from "socket.io-client";
import * as THREE from "three";
extend({});

function Painter() {
  const [isPainting, setIsPainting] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const brushRef = useRef<THREE.Mesh>(null);

  const { gl, camera } = useThree();
  //   const { camera } = useThree() // Hier wird die camera Eigenschaft des three Objekts abgerufen
  useFrame(() => {
    console.log("hamed", isPainting);

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
function MyScene() {
  const { camera, gl } = useThree(); // Hier wird die camera Eigenschaft des three Objekts abgerufen
  return (
    <>
      <primitive object={gl} />
      <primitive object={camera} />
    </>
  );
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLocalPlayer, setIsLocalPlayer] = useState(false);
  const [socket, setSocket] = useState(undefined);
  const brushRef = useRef();

  useEffect(() => {
    const newSocket: any = io("http://localhost:3001");
    newSocket.on("connect", () => {
      setIsConnected(true);
      setSocket(newSocket);
    });
    newSocket.on("playerJoined", (playerId: any) => {
      if (playerId === newSocket.id) {
        setIsLocalPlayer(true);
      }
    });
    newSocket.on("playerLeft", (playerId: any) => {
      // handle player leaving
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <ARButton></ARButton>
      <Canvas>
        <XR>
          {/* <ambientLight />
          <pointLight position={[10, 10, 10]} /> */}
          {/* <MyScene></MyScene> */}
          {/* {isConnected && socket && (
            <Painter isLocalPlayer={isLocalPlayer} socket={socket} />
          )} */}
          <Painter />
          {/* <mesh>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
          </mesh> */}
        </XR>
      </Canvas>
    </>
  );
}

export default App;
