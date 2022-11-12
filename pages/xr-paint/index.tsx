import { Button } from "@mui/material";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { database } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Painter1 from "./painter1";
import Painter2 from "./painter2";
import { testingData } from "./test";

const PaintXR = () => {
  const [players, setPlayers] = useState<any>(null);
  const [playerName, setPlayerName] = useState<string>("player1");
  const getHostByPlayer = () => {
    const docKey = "zb5tWRiOArpG0vR5PjO8";
    onSnapshot(doc(database, `host/${docKey}`), (doc) => {
      const data = doc.data();
      const id = doc.id;
      setPlayers({ id, ...data });
    });
  };

  useEffect(() => {
    // getHostByPlayer();
  }, []);
  return (
    <div className="containerCanva">
      <label>{playerName}</label>
      <Button variant="outlined" onClick={() => setPlayerName("player1")}>
        Player 1
      </Button>
      <Button variant="outlined" onClick={() => setPlayerName("player2")}>
        Player 2
      </Button>
      <ARButton></ARButton>
      <Canvas>
        <XR>
          {playerName === "player1" ? (
            <Painter1 paintPositionFromDB={testingData}></Painter1>
          ) : (
            <Painter2 paintPositionFromDB={testingData}></Painter2>
          )}
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
