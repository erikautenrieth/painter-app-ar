import { useAuth } from "./auth-context";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { database } from "../../config/firebase";
import { createContext, useContext, useState } from "react";

export const getUserById = async () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const docRef = doc(database, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    data.id = docSnap.id;

    setUserData(data);
  }
};
