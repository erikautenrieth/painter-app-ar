import { Button, Grid, Icon, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Navbar from "shared-components/components/navbar/Navbar";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setIndexConfiguration,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../config/firebase";
import { ZustandStore } from "shared-components/services/hooks/zustand.state";
import Sidemenu from "shared-components/components/navbar/Sidemenu";
// 3D Models imports of React-Three-Fiber
import {
  Canvas,
  useThree,
  useFrame,
  ThreeElements,
  useLoader,
} from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAnimations, useGLTF } from "@react-three/drei";
import Playeranimation from "./playeranimation";

export type IPosition = {
  x: number;
  y: number;
  z: number;
};
export type IHost = {
  player1Ready: boolean;
  player2Ready: boolean;
  createdAt: Date;
  player1Position: IPosition[];
  player2Position: IPosition[];
};
const HostingPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<any>("admin");
  const [userState, setUserState] = useState<any>(false);
  // hier wird die ID von Host gesetzt
  const [existHost, setExistHost] = useState<any>(null);
  const [createHostIs, setCreateHost] = useState<any>(false);
  const [hostingData, setHostingData] = useState<any>(null);
  const zustandStore = ZustandStore();
  const { hostingId } = router.query;


  const [isReady1, setIsReady1] = useState(false);
  const [isReady2, setIsReady2] = useState(false);
  const handleReady1 = () => {setIsReady1(true);};
  const handleReady2 = () => {setIsReady2(true);};
  let modelPlayer1: any;

  // Funktion für Button Ready wenn beide Spieler Ready setIndexConfiguration, wird state User State auf true gesetzt
  const getReady = () => {
    if (existHost) {
      if (existHost[0].id) {
        setUserState(true);
        setPlayerReadyInDB(userRole);
      } else {
        console.log("No Hosting ID");
      }
    }
  };
  const setPlayerReadyInDB = async (role: string) => {
    const docRef = doc(database, `host/${existHost[0].id}`);
    if (role === "admin") {
      await updateDoc(docRef, {
        player1Ready: true,
      });
    } else {
      await updateDoc(docRef, {
        player2Ready: true,
      });
    }
  };

  // hier wird nur duch admin dies Button sichtbar und nach dem exite sollte hosting server gelöscht werden
  const exitHosting = () => {
    existHost.forEach(async (element: any) => {
      const docID = element.id;
      const docRef = doc(database, `host/${docID}`);

      await deleteDoc(docRef).then(
        () => {
          console.log("host by id removed  ");
        },
        (error) => {
          console.log("host couldn,t remove by error   ", error);
        }
      );
    });
    setTimeout(() => {
      router.push("/home");
    }, 1000);
  };

  // hier wird überprüft für Nutzer welche host joinen möchte ob ein Host in reall time existiert oder nicht
  const checkTheHostingServerRealTime = () => {
    const docCollection = collection(database, "host");
    onSnapshot(
      docCollection,
      (doc) => {
        if (doc.docs && doc.docs[0]) {
          setExistHost(doc.docs);
        } else {
          setExistHost(null);
        }
      },
      (error) => {
        console.log("firebase error is  ", error);
        setExistHost(null);
      }
    );
  };

  /**
   * diese Methode von hosting nutzen wir um die Daten aus dem Hosting Server lesen
   * das benötigen wir bei Buttons Ready
   * damit der Admin von Host oder Joiner von Host
   * in Echtzeit gegenseitig sehen können, ob der andere Nutzer bereit ist
   */
  const readHostDataInRealTime = () => {
    if (existHost) {
      const docRef = doc(database, `host/${existHost[0].id}`);
      onSnapshot(docRef, (doc) => {
        const data = doc.data();
        const id = doc.id;
        if (data) {
          setHostingData({ id, ...data });
          zustandStore.setHostingId(id);
          // console.log("hamedkabir  ", zustandStore);
        }
      });
    }
  };

  const checkExistingHost = async () => {
    const docCollection = collection(database, "host");
    await getDocs(docCollection).then((data) => {
      if (data.docs.length > 0) {
        console.log("host already exist");
      } else {
        if (userRole == "admin") {
          createHost();
        }
      }
    });
  };

  // eine Methode direkt nach dem Admin bei der Seite ankommt ein Host automatisch erstellt wird
  const createHost = async () => {
    const docCollection = collection(database, "host");
    const hostObject: IHost = {
      player1Ready: false,
      player2Ready: false,
      createdAt: new Date(),
      player1Position: [],
      player2Position: [],
    };
    await addDoc(docCollection, hostObject).then(
      (res) => {
        console.log("Host created successfully!");
        setCreateHost(true);
      },
      (error) => {
        console.log("hosting error   ", error);
        setCreateHost(false);
      }
    );
  };

  function Model({ url }: any) {
    const { nodes, materials }: any = useLoader(GLTFLoader, url);
    return <primitive object={nodes.Scene} />;
  }

  // useEffect(() => {
  //   modelPlayer1 = useGLTF("/models/glb/antIdle.glb");
  //   const { actions } = useAnimations(
  //     modelPlayer1.animations,
  //     modelPlayer1.scene
  //   );
  // });

  useEffect(() => {
    setUserRole(hostingId);
    checkTheHostingServerRealTime();
  }, []);

  useEffect(() => {
    if (!hostingData) {
      readHostDataInRealTime();
    }
  }, [existHost]);

  const [seconds, setSeconds] = useState<number>(5);

  useEffect(() => {
    let interval: any = undefined;
    if (hostingData) {
      if (hostingData.player1Ready && hostingData.player2Ready) {
        if (seconds > 0) {
          interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
          }, 1000);
          return () => clearInterval(interval);
        } else {
          setTimeout(() => {
            router.push("/xr-paint");
          }, 1000);
          return () => clearInterval(interval);
        }
      }
    }
  }, [seconds, hostingData]);
  return (
    <>
      <Navbar />
      {existHost || userRole == "admin" ? (
        <>
          {userRole == "admin" ? (
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                marginTop: 10,
                maxWidth: 350,
                flexGrow: 1,
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                rowSpacing={5}
                columnSpacing={1}
              >
                {!createHostIs ? (
                  <Grid item xs={6}>
                    <Button
                      size="large"
                      variant="contained"
                      onClick={() => checkExistingHost()}
                    >
                      Erstelle Host
                    </Button>
                  </Grid>
                ) : null}
                <Grid item xs={6}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => exitHosting()}
                  >
                    Beende Hosting
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ) : null}
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              marginTop: 20,
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
              <Grid
                item
                xs={6}
                className={
                  hostingData
                    ? hostingData.player1Ready
                      ? "hosting-user-ready"
                      : ""
                    : ""
                }
              >

                <Playeranimation ready={isReady1} name={"antDance"}/>


                {/*<img*/}
                {/*  src="/gifs/yy3.gif"*/}
                {/*  alt="A responsive GIF"*/}
                {/*  style={{ width: "100%", height: "auto" }}*/}
                {/*/>*/}
                <h1 className="player text-align-center">Spieler 1</h1>
              </Grid>
              <Grid
                item
                xs={6}
                className={
                  hostingData
                    ? hostingData.player2Ready
                      ? "hosting-user-ready"
                      : ""
                    : ""
                }
              >


                <Playeranimation ready={isReady2} name={"kongDance"}/>
                {/*<img*/}
                {/*  src="/gifs/yy3.gif"*/}
                {/*  alt="A responsive GIF"*/}
                {/*  style={{ width: "100%", height: "auto" }}*/}
                {/*/>*/}

                <h1 className="player text-align-center">Spieler 2</h1>
              </Grid>
              <Grid item xs={6} className="no-padding text-align-center">
                {userRole == "admin" ? (
                  <>
                    {userState ? (
                      <Icon
                        color="success"
                        fontSize="large"
                        component={CheckCircleOutlineOutlinedIcon}
                      ></Icon>
                    ) : (
                      <Button
                        size="large"
                        variant="contained"
                        onClick={() => {getReady(); handleReady1()}}
                      >
                        Bereit
                      </Button>
                    )}
                  </>
                ) : hostingData ? (
                  hostingData.player1Ready ? (
                    <Icon
                      color="success"
                      fontSize="large"
                      component={CheckCircleOutlineOutlinedIcon}
                    ></Icon>
                  ) : null
                ) : null}
              </Grid>
              <Grid item xs={6} className="no-padding text-align-center">
                {userRole == "join" ? (
                  <>
                    {userState ? (
                      <Icon
                        color="success"
                        fontSize="large"
                        component={CheckCircleOutlineOutlinedIcon}
                      ></Icon>
                    ) : (
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={() => {
                          getReady();
                          handleReady2()}} >
                        Bereit
                      </Button>
                    )}
                  </>
                ) : hostingData ? (
                  hostingData.player2Ready ? (
                    <Icon
                      color="success"
                      fontSize="large"
                      component={CheckCircleOutlineOutlinedIcon}
                    ></Icon>
                  ) : null
                ) : null}
              </Grid>
            </Grid>
            {hostingData ? (
              hostingData.player1Ready && hostingData.player2Ready ? (
                <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
                  <Grid item xs={12}>
                    <h1>Redirecting to Painting Server in: {seconds}</h1>
                  </Grid>
                </Grid>
              ) : null
            ) : null}
          </Paper>
        </>
      ) : (
        <h1>Please wait of host ...</h1>
      )}
    </>
  );
};
export default HostingPage;
