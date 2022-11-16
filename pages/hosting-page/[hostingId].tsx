import { Button, Grid, Icon } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
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
  const { hostingId } = router.query;

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
  useEffect(() => {
    setUserRole(hostingId);
    checkTheHostingServerRealTime();
  }, []);

  useEffect(() => {
    if (!hostingData) {
      readHostDataInRealTime();
    }
  }, [existHost]);

  return (
    <>
      {existHost || userRole == "admin" ? (
        <>
          {userRole == "admin" ? (
            <Grid columns={{ md: 12 }}>
              {!createHostIs ? (
                <Button variant="outlined" onClick={() => checkExistingHost()}>
                  Create Host
                </Button>
              ) : null}

              <Button variant="outlined" onClick={() => exitHosting()}>
                Exit Hosting
              </Button>
            </Grid>
          ) : null}
          <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
            <Grid item xs={6}>
              <h1>Player1</h1>
              {userRole == "admin" ? (
                <>
                  {userState ? (
                    <Icon
                      color="success"
                      fontSize="large"
                      component={CheckCircleOutlineOutlinedIcon}
                    ></Icon>
                  ) : (
                    <Button variant="outlined" onClick={() => getReady()}>
                      Ready
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
            <Grid item xs={6}>
              <h1>Player2</h1>
              {userRole == "join" ? (
                <>
                  {userState ? (
                    <Icon
                      color="success"
                      fontSize="large"
                      component={CheckCircleOutlineOutlinedIcon}
                    ></Icon>
                  ) : (
                    <Button variant="outlined" onClick={() => getReady()}>
                      Ready
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
        </>
      ) : (
        <h1>Please wait of host ...</h1>
      )}
    </>
  );
};
export default HostingPage;
