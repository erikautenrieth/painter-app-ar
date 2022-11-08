import { Box, OrbitControls, Stats, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MeshNormalMaterial, BufferGeometry, BoxGeometry } from "three";
import { io } from "socket.io-client";
import { useInput } from "../../shared-components/services/hooks/useInput";
import { directionOffset } from "../../shared-components/services/player/player.service";
import * as THREE from "three";
import MyBox from "./box";
import { useAuth } from "../../shared-components/services/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../config/firebase";

let rotateQuartenion = new THREE.Quaternion();

const Metaverse = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>();
  const getUserById = async () => {
    const docRef = doc(database, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      data.id = docSnap.id;

      setUserData(data);
    }
  };
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div className="container">
      <Canvas camera={{ position: [0, 10, -5], near: 0.1, far: 1000 }}>
        {/* <Canvas> */}
        <Stats />
        <gridHelper rotation={[0, 0, 0]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <OrbitControls></OrbitControls> */}
        <MyBox user={userData} originPosition={[-3, 0, 0]}></MyBox>
        <MyBox user={userData} originPosition={[3, 0, 0]}></MyBox>
      </Canvas>
    </div>
  );
};

export default Metaverse;
