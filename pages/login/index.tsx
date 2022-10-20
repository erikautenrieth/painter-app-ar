import { Button, Grid, TextField } from "@mui/material";
function test() {
  console.log("Clicked!");
}

export default function Login() {
  return (
    <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
      <Grid item xs={12}>
        <TextField
          type={"email"}
          id="standard-basic"
          label="Username"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type={"password"}
          id="standard-basic"
          label="Password"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => test()}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
