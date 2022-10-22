import { Button, Grid, TextField } from "@mui/material";

import "firebaseui/dist/firebaseui.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/router";
import { useAuth } from "../../shared-components/services/auth-context";

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    console.log(user);

    try {
      await login(data.email, data.password);
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  function goToPage(rout: string) {
    router.push("/test");
  }
  return (
    // <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
    //   <Grid item xs={12}>
    //     <TextField
    //       type={"email"}
    //       id="standard-basic"
    //       label="Username"
    //       variant="standard"
    //     />
    //   </Grid>
    //   <Grid item xs={12}>
    //     <TextField
    //       type={"password"}
    //       id="standard-basic"
    //       label="Password"
    //       variant="standard"
    //     />
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Button variant="outlined" onClick={() => test()}>
    //       Login
    //     </Button>
    //   </Grid>
    // </Grid>
    // <div className={"firebase-auth-container"}></div>
    <form onSubmit={handleLogin}>
      <TextField
        type={"email"}
        label="Username"
        variant="standard"
        required
        onChange={(e: any) =>
          setData({
            ...data,
            email: e.target.value,
          })
        }
      />
      <TextField
        type={"password"}
        label="Password"
        variant="standard"
        required
        onChange={(e: any) =>
          setData({
            ...data,
            password: e.target.value,
          })
        }
      />
      <Button variant="outlined" type="submit">
        Login
      </Button>
      <Button variant="outlined" onClick={() => goToPage("/test")}>
        XR Test
      </Button>
    </form>
  );
};
export default Login;
