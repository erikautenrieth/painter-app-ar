import { Button, Grid, Icon } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const HostingPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<any>("admin");
  const [userState, setUserState] = useState<any>(false);
  const { hostingId } = router.query;

  const getReady = () => {
    setUserState(true);
  };
  useEffect(() => {
    setUserRole(hostingId);
  }, []);
  console.log("hamedkabir  ", userRole);

  return (
    <>
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
    </>
  );
};
export default HostingPage;
