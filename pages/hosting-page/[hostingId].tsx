import { Button, Grid, Icon } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import {
  collection,
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
  const [existHost, setExistHost] = useState<any>(null);
  const { hostingId } = router.query;

  // Funktion für Button Ready wenn beide Spieler Ready setIndexConfiguration, wird state User State auf true gesetzt
  const getReady = () => {
    setUserState(true);
  };

  const checkTheHostingServer = () => {
    const docCollection = collection(database, "host");
    onSnapshot(
      docCollection,
      (doc) => {
        if (doc.docs && doc.docs[0]) {
          setExistHost(doc.docs[0].id);
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
  useEffect(() => {
    setUserRole(hostingId);
    checkTheHostingServer();
  }, []);
  console.log("hamedkabir  ", userRole);

  return (
    <>
      {existHost || userRole == "admin" ? (
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
            ) : null}
          </Grid>
        </Grid>
      ) : (
        <h1>Please wait of host ...</h1>
      )}
    </>
  );
};
export default HostingPage;
