import { useState } from "react";
import { getUserById } from "../../shared-components/services/firebase-database";

export default function Home() {
  getUserById();

  return <h1>Page Home user Testing</h1>;
}
