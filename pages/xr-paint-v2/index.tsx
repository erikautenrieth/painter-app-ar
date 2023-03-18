import { database } from "config/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useColor } from "react-color-palette";
import { IColor } from "shared-components/interfaces/host.interface";
import { IUser } from "shared-components/interfaces/user.interface";
import { useAuth } from "shared-components/services/auth-context";
import { ZustandStore } from "shared-components/services/hooks/zustand.state";
import PainterV2 from "./painter-v2";

const XrPainterV2 = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<IUser>();

  const [painterSize1, setPainterSize1] = useState<number>(0.4);
  const [painterSize2, setPainterSize2] = useState<number>(0.4);
  const [colorPlayer1, setColorPlayer1] = useColor("hex", "#dad810");
  const [colorPlayer2, setColorPlayer2] = useColor("hex", "#1fd243");
  const zustandStore = ZustandStore();

  const hostID2: string | undefined = zustandStore.hostingId;
  const hostID: string | undefined = "Q9oLV94mYhny8JO4A3s1";

  const getUserById = async () => {
    const docRef = doc(database, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      data.id = docSnap.id;
      if (data) {
        const userObject: IUser = {
          id: data.id,
          name: data.name,
          role: data.role,
        };
        setUserData(userObject);
      }
    }
  };

  function rangeValueText(value: number) {
    updatePlayerPaintSize(value);
    return `${value}`;
  }

  const handleChangeSize = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      userData?.role === "player"
        ? setPainterSize2(newValue as number)
        : setPainterSize1(newValue as number);
    }
  };

  const updatePlayerPaintSize = async (value: number) => {
    const docRef = doc(database, `host/${hostID}`);
    if (userData?.role === "player") {
      await updateDoc(docRef, {
        player2PaintSize: value,
      });
    } else {
      await updateDoc(docRef, {
        player1PaintSize: value,
      });
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
    if (userData?.role === "player") {
      await updateDoc(docRef, {
        player2Color: value,
      });
    } else {
      await updateDoc(docRef, {
        player1Color: value,
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

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    getPlayerPaintSizeAndColor();
  }, []);

  // useEffect(() => {
  //   if (!user.uid) {
  //     router.push("/landingpage");
  //   }
  // }, [user.uid]);
  return (
    <>
      <PainterV2></PainterV2>
    </>
  );
};

export default XrPainterV2;
