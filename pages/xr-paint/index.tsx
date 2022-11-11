import { Button } from "@mui/material";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { database } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Painter1 from "./painter1";

const PaintXR = () => {
  const [players, setPlayers] = useState<any>(null);
  const [fakePlayer, setFakePlayer] = useState<string>("player1");
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
  }, [fakePlayer]);

  return (
    <div className="containerCanva">
      <Button onClick={() => setFakePlayer("player1")}>set Player 1</Button>
      <Button onClick={() => setFakePlayer("player2")}>set Player 2</Button>
      <ARButton></ARButton>
      <Canvas>
        <XR>
          {players ? (
            <Painter1
              paintPositionFromDB={players.player1.position}
              fakePlayer={fakePlayer}
            ></Painter1>
          ) : null}
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
