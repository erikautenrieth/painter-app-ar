import { Button, Grid, Icon } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Navbar from "components/landingpage/Navbar";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setIndexConfiguration,
} from "firebase/firestore";
import { database } from "../../config/firebase";

const HostingPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<any>("admin");
  const [userState, setUserState] = useState<any>(false);
  // hier wird die ID von Host gesetzt
  const [existHost, setExistHost] = useState<any>(null);
  const [createHostIs, setCreateHost] = useState<any>(false);
  const { hostingId } = router.query;

  // Funktion für Button Ready wenn beide Spieler Ready setIndexConfiguration, wird state User State auf true gesetzt
  const getReady = () => {
    setUserState(true);
  };

  // hier wird nur duch admin dies Button sichtbar und nach dem exite sollte hosting server gelöscht werden
  const exitHosting = () => {
    existHost.forEach(async (element: any) => {
      const docID = element.id;
      const docRef = doc(database, `host/${docID}`);

      await deleteDoc(docRef).then(
        () => {
          console.log("host by id removed  ", docID);
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

  const checkExistingHost = async () => {
    const docCollection = collection(database, "host");
    await getDocs(docCollection).then((data) => {
      if (data.docs.length > 0) {
        console.log("host already exist", data.docs.length);
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
    await addDoc(docCollection, {
      playerAdminReady: false,
      playerJoinReady: false,
      createdAt: new Date(),
    }).then(
      () => {
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

    // nur wenn kein hosting existiert und die Role admin ist
    // if (userRole == "admin") {
    //   checkExistingHost();
    // }
  }, []);
  return (
    <>
      <Navbar />
      {existHost || userRole == "admin" ? (
        <>
          <div><br/><br/><br/><br/><br/><br/></div>
          {userRole == "admin" ? (
            <Grid  container
                   gap={12}
                   direction="row"
                   justifyContent="center"
                   alignItems="center"
                   rowSpacing={5}
                   >
              {!createHostIs ? (
                <Button size="large" variant="contained" onClick={() => checkExistingHost()}>
                  Erstelle Host
                </Button>
              ) : null}

              <Button size="large"  variant="contained" onClick={() => exitHosting()}>
                Beende Hosting
              </Button>
            </Grid>
          ) : null}

          <div><br/><br/><br/><br/><br/><br/><br/><br/></div>

          <Grid container
                gap={12}
                direction="row"
                justifyContent="center"
                rowSpacing={5}>

            <Grid item xs={2}>

              <figure className="avatar">
                <img
                    src="https://www.thispersondoesnotexist.com/image"
                    height="150px"
                    width={"150px"}
                />
              </figure>

              <h1 className="player" >Spieler 1</h1>

              {userRole == "admin" ? (
                <>
                  {userState ? (
                    <Icon
                      color="success"
                      fontSize="large"
                      component={CheckCircleOutlineOutlinedIcon}
                    ></Icon>
                  ) : (
                    <Button size="large" variant="contained" onClick={() => getReady()}>
                      Bereit
                    </Button>
                  )}
                </>
              ) : null}
            </Grid>
            <Grid item xs={4}>

              <figure className="avatar">
                <img
                    src="https://images.generated.photos/LsZoe6BGKISgVVpgpAGpscQn0nUV6zuF0q4q4OmzFJ0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDI1/NDQ4LmpwZw.jpg"
                    height="150px"
                    width={"150px"}
                />
              </figure>


              <h1 className="player">Spieler 2</h1>
              {userRole == "join" ? (
                <>
                  {userState ? (
                    <Icon
                      color="success"
                      fontSize="large"
                      component={CheckCircleOutlineOutlinedIcon}
                    ></Icon>
                  ) : (
                    <Button size="large" variant="outlined" onClick={() => getReady()}>
                      Bereit
                    </Button>
                  )}
                </>
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
