import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "../../shared-components/services/auth-context";
import Footer from "components/landingpage/Footer";
import Navbar from "components/landingpage/Navbar";
import React from "react";


export default function Home() {
  // getUserById();
  const { user } = useAuth();
  console.log("user   ", user);
  const router = useRouter();
  const navigateToPage = (href: string) => {
    router.push(href);
  };

  return (
    <>
        <Navbar />



      <Button
        variant="outlined"
        onClick={() => navigateToPage("/hosting-page/admin")}
      >
        Start Host
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigateToPage("/hosting-page/join")}
      >
        Join a Host
      </Button>

        <Button variant="outlined" onClick={() => navigateToPage("/test")}>
        XR Test
    </Button>

        <Button variant="outlined" onClick={() => navigateToPage("/test/painter")}>
            XR Test Painter
        </Button>

    </>
  );
}
