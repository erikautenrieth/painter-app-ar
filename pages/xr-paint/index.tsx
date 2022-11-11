import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { database } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Painter1 from "./painter1";
import Painter2 from "./painter2";

const PaintXR = () => {
  const [players, setPlayers] = useState<any>(null);
  const getHostByPlayer = () => {
    const docKey = "zb5tWRiOArpG0vR5PjO8";
    onSnapshot(doc(database, `host/${docKey}`), (doc) => {
      const data = doc.data();
      const id = doc.id;
      setPlayers({ id, ...data });
    });
  };
  useEffect(() => {
    getHostByPlayer();
  }, []);
  return (
    <div className="containerCanva">
      <ARButton></ARButton>
      <Canvas>
        <XR>
          {players ? (
            <>
              {/* <Painter1
                paintPositionFromDB={players.player2.position}
              ></Painter1> */}
              <Painter2
                paintPositionFromDB={players.player1.position}
              ></Painter2>
            </>
          ) : null}
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
