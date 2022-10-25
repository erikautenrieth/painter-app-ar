import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "../../shared-components/services/auth-context";

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
    </>
  );
}
