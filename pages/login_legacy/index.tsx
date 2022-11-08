import { Button, TextField } from "@mui/material";

import "firebaseui/dist/firebaseui.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "shared-components/services/auth-context";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


/**
 * User1: user1@real-chat.de     123456
 * User2: user2@real-chat.de     123456
 */

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(data.email, data.password);
      goToPage("/home");
    } catch (err) {
      console.log(err);
    }
  };

  function goToPage(rout: string) {
    router.push(rout);
  }
  const [value, setValue] = React.useState(2);
  return (

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
