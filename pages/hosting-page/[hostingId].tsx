import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HostingPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<any>("admin");
  const { hostingId } = router.query;
  useEffect(() => {
    setUserRole(hostingId);
  }, []);
  console.log("hamedkabir  ", userRole);

  return (
    <>
      <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
        <Grid item xs={6}>
          <h1>Player1</h1>
        </Grid>
        <Grid item xs={6}>
          <h1>Player2</h1>
        </Grid>
      </Grid>
    </>
  );
};
export default HostingPage;
