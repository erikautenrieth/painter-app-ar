import { Canvas, useFrame } from "@react-three/fiber";
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
import Sidemenu from "shared-components/components/navbar/Sidemenu";
import { useAuth } from "shared-components/services/auth-context";
import { ZustandStore } from "shared-components/services/hooks/zustand.state";
import * as THREE from "three";
import Painter1 from "./painter1";
import Painter2 from "./painter2";
import { Button, Grid, Paper, Slider } from "@mui/material";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import { Range } from "react-range";
import Navbar from "../../shared-components/components/navbar/Navbar";

function Button2({ onClick, children, position, scale }: any) {
  const meshRef: any = useRef();

  useFrame((state: any) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.mouseY * 0.01;
      meshRef.current.rotation.y = state.mouseX * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} onClick={onClick} position={position} scale={scale}>
      <planeGeometry />
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <meshBasicMaterial color={"orange"} />
    </mesh>
  );
}

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref: any = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
    }
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const PaintXR = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>();
  let [player1, setPlayer1] = useState<
    { index: number; x: number; y: number; z: number }[]
  >([]);
  let [player2, setPlayer2] = useState<
    { index: number; x: number; y: number; z: number }[]
  >([]);
  // Color Picker
  // https://www.geeksforgeeks.org/how-to-add-color-picker-in-nextjs/
  const [color, setColor] = useColor("hex", "#121212");
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  // Ranger Paint Größe
  // https://www.geeksforgeeks.org/how-to-add-slider-in-next-js/
  const [painterSize, setPainterSize] = useState<number>(0.4);

  const zustandStore = ZustandStore();

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
  const getPlayerPosition1 = async () => {
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
            if (data) {
              array.push({ id, ...data });
            }
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
            if (data) {
              array.push({ id, ...data });
            }
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
  const getPlayerPosition = async () => {
    const docKey = zustandStore.hostingId;
    onSnapshot(doc(database, `host/${docKey}`), (doc) => {
      const data = doc.data();
      const id = doc.id;
      if (data) {
        // if (data.player2) {
        //   setPlayer2(data.player2.position);
        // }
        // if (data.player1) {
        //   setPlayer1(data.player1.position);
        // }
        setPlayer1(data.player1Position);
        setPlayer2(data.player2Position);
      }
    });
  };

  useEffect(() => {
    getUserById();
  }, []);

  // useEffect(() => {
  //   if (zustandStore) {
  //     getPlayerPosition();
  //   }
  // }, [loader]);
  if (userData) {
    console.log("hamedkabir role  ", userData.role);
  }

  if (zustandStore) {
    console.log("hamedkabir hosting id  ", zustandStore.hostingId);
  }

  function rangeValueText(value: number) {
    return `${value}`;
  }

  return (
    <div className="containerCanva">
      <Navbar/>
      {openColorPicker ? (
        <ColorPicker
          width={320}
          height={228}
          color={color}
          onChange={setColor}
          hideHSV
          dark
        />
      ) : null}
      <Paper
        className="xr-paint-setting-ui"
        sx={{
          p: 2,
          margin: "auto",
          marginTop: 10,
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowSpacing={15}
          columnSpacing={1}
        >
          <Grid item xs={6}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenColorPicker(openColorPicker ? false : true)}
            >
              Open/ Close Color Picker
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Slider
              aria-label="Painter Size"
              defaultValue={painterSize}
              getAriaValueText={rangeValueText}
              valueLabelDisplay="on"
              step={0.1}
              marks
              min={0}
              max={5}
            />
          </Grid>
          <Grid item xs>
            {userData ? <ARButton></ARButton> : null}
          </Grid>
        </Grid>
      </Paper>

      {userData ? <ARButton></ARButton> : null}
      {/* <Button className="hamedkabir" size="large" variant="contained">
        Bereit
      </Button> */}
      <Canvas>
        <XR>
          {/* <Button onClick={handleClick} position={[0, 0, -5]} scale={[2, 2, 2]}>
            Click me
          </Button> */}
          {userData ? (
            userData.role === "admin" ? (
              <Painter1 hostingId={"C40TA8sCawBJm8GwJzsv"}></Painter1>
            ) : userData.role === "player" ? (
              <Painter2 hostingId={"C40TA8sCawBJm8GwJzsv"}></Painter2>
            ) : null
          ) : null}
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
