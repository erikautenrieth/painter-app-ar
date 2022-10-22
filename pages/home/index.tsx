import { useAuth } from "../../shared-components/services/auth-context";

export default function Home() {
  const { user } = useAuth();
  console.log("hamedkabir   ", user);

  return <h1>Page Home</h1>;
}
