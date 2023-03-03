import { Canvas, useFrame } from "@react-three/fiber";
import { ARButton, useXR, XR } from "@react-three/xr";
import { database } from "config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useAuth } from "shared-components/services/auth-context";
import { ZustandStore } from "shared-components/services/hooks/zustand.state";
import Painter1 from "./painter1";
import Painter2 from "./painter2";
import { Button, Grid, Paper, Slider } from "@mui/material";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Navbar from "../../shared-components/components/navbar/Navbar";
import { async } from "@firebase/util";
import { Color } from "three/src/Three";
import { IColor } from "shared-components/interfaces/host.interface";

const PaintXR = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>();
  // Color Picker
  // https://www.geeksforgeeks.org/how-to-add-color-picker-in-nextjs/
  // Slider
  // https://www.geeksforgeeks.org/how-to-add-slider-in-next-js/

  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const email = user.email;
  const emailUser1 = "user1@real-chat.de";
  const [painterSize1, setPainterSize1] = useState<number>(0.4);
  const [painterSize2, setPainterSize2] = useState<number>(0.4);
  const [colorPlayer1, setColorPlayer1] = useColor("hex", "#dad810");
  const [colorPlayer2, setColorPlayer2] = useColor("hex", "#1fd243");
  const zustandStore = ZustandStore();

  const hostID2: string | undefined = zustandStore.hostingId;

  // Q9oLV94mYhny8JO4A3s1
  const hostID: string | undefined = "Q9oLV94mYhny8JO4A3s1";
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

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    getPlayerPaintSizeAndColor();
  }, []);

  function rangeValueText(value: number) {
    updatePlayerPaintSize(value);
    return `${value}`;
  }

  const updatePlayerPaintSize = async (value: number) => {
    const docRef = doc(database, `host/${hostID}`);
    if (email === emailUser1) {
      await updateDoc(docRef, {
        player2PaintSize: value,
      });
    } else {
      await updateDoc(docRef, {
        player1PaintSize: value,
      });
    }
  };

  const getPlayerPaintSizeAndColor = async () => {
    onSnapshot(doc(database, `host/${hostID}`), (doc) => {
      const data = doc.data();
      if (data) {
        setPainterSize1(data.player1PaintSize);
        setPainterSize2(data.player2PaintSize);
        setColorPlayer1(data.player1Color);
        setColorPlayer2(data.player2Color);
      }
    });
  };

  const handleChangeSize = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      email === emailUser1
        ? setPainterSize2(newValue as number)
        : setPainterSize1(newValue as number);
    }
  };

  const handleColorChange = (event: any) => {
    const obj: IColor = {
      hex: event.hex,
      hsv: {
        a: event.hsv.a ? event.hsv.a : null,
        h: event.hsv.h,
        s: event.hsv.s,
        v: event.hsv.v,
      },
      rgb: {
        a: event.rgb.a ? event.rgb.a : null,
        b: event.rgb.b,
        g: event.rgb.g,
        r: event.rgb.r,
      },
    };
    updatePlayerPaintColor(obj);
  };

  const updatePlayerPaintColor = async (value: any) => {
    const docRef = doc(database, `host/${hostID}`);
    if (email === emailUser1) {
      await updateDoc(docRef, {
        player2Color: value,
      });
    } else {
      await updateDoc(docRef, {
        player1Color: value,
      });
    }
  };

  const { isPresenting } = useXR();
  const handlePointerDown = (event: { buttons: number }) => {
    if (isPresenting && event.buttons === 2) {
      console.log("hamedkabir down");

      // Hier können Sie Ihren Code ausführen, wenn der Benutzer in einer XR-Umgebung ist und mit der rechten Maustaste klickt
    }
  };

  return (
    <div className="containerCanva">
      <Navbar />
      {openColorPicker ? (
        <Grid
          className="painter-color-picker-position"
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <ColorPicker
            width={320}
            height={228}
            color={email === emailUser1 ? colorPlayer2 : colorPlayer1}
            // onChange={email === emailUser1 ? setColorPlayer2 : setColorPlayer1}
            onChange={handleColorChange}
            hideHSV
            dark
          />
        </Grid>
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
              value={email === emailUser1 ? painterSize2 : painterSize1}
              getAriaValueText={rangeValueText}
              valueLabelDisplay="on"
              step={0.1}
              marks
              min={0.1}
              max={4}
              onChange={handleChangeSize}
            />
          </Grid>
          <Grid item xs>
            {userData ? <ARButton></ARButton> : null}
          </Grid>
        </Grid>
      </Paper>

      <Canvas onPointerDown={handlePointerDown}>
        <XR>
          {userData ? (
            userData.role === "admin" ? (
              <Painter1
                hostingId={hostID}
                color={colorPlayer1}
                colorPlayer2={colorPlayer2}
                size={painterSize1}
                sizePlayer2={painterSize2}
              ></Painter1>
            ) : userData.role === "player" ? (
              <Painter2
                hostingId={hostID}
                color={colorPlayer2}
                colorPlayer1={colorPlayer1}
                size={painterSize2}
                sizePlayer1={painterSize1}
              ></Painter2>
            ) : null
          ) : null}
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
