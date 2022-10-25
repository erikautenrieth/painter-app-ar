import { Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../shared-components/services/auth-context";
import { getUserById } from "../../shared-components/services/firebase-database";

export default function Home() {
  // getUserById();
  const { user } = useAuth();
  console.log("user   ", user);

  return (
    <>
      <Button variant="outlined">Start Host</Button>
      <Button variant="outlined">Join a Host</Button>
    </>
  );
}
