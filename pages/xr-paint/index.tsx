import { Button } from "@mui/material";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { database } from "config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "shared-components/services/auth-context";
import * as THREE from "three";
import Painter1 from "./painter1";
import Painter2 from "./painter2";
import { testingData } from "./test";

const PaintXR = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>();
  let [player1, setPlayer1] = useState<any>([]);
  let [player2, setPlayer2] = useState<any>([]);

  const getUserById = async () => {
    const docRef = doc(database, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      data.id = docSnap.id;

      setUserData(data);
      setLoader(true);
    }
  };

  /**
   * this method ready from collection and each position with doc it and index
   */
  const getPlayerPosition = async () => {
    const docKey = "zb5tWRiOArpG0vR5PjO8";

    if (userData) {
      if (userData.role === "admin") {
        const q = query(
          collection(database, `host/${docKey}/player2`),
          orderBy("index", "asc")
        );
        onSnapshot(q, (doc) => {
          const array: any = [];
          doc.forEach((res) => {
            const data = res.data();
            const id = res.id;
            array.push({ id, ...data });
          });
          setPlayer2(array);
          // player2 = array;
        });
      } else {
        const q = query(
          collection(database, `host/${docKey}/player1`),
          orderBy("index", "asc")
        );
        onSnapshot(q, (doc) => {
          const array: any = [];
          doc.forEach((res) => {
            const data = res.data();
            const id = res.id;
            array.push({ id, ...data });
          });
          setPlayer1(array);

          // player1 = array;
        });
      }
    }
  };

  /**
   * this method read player position from document and array
   */
  const getPlayerPosition2 = async () => {
    const docKey = "zb5tWRiOArpG0vR5PjO8";
    onSnapshot(doc(database, `host/${docKey}`), (doc) => {
      const data = doc.data();
      const id = doc.id;
      if (data) {
        setPlayer2(data.player2.position);
      }
    });
  };

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    getPlayerPosition();
  }, [loader]);
  if (userData) {
    console.log("hamedkabir role  ", userData.role);
  }

  return (
    <div className="containerCanva">
      {userData ? <ARButton></ARButton> : null}
      <Canvas>
        <XR>
          {userData ? (
            userData.role === "admin" ? (
              <Painter1 paintPositionFromDB={player2}></Painter1>
            ) : userData.role === "player" ? (
              <Painter2 paintPositionFromDB={player1}></Painter2>
            ) : null
          ) : null}
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
