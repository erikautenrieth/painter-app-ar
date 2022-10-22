import firebase from "firebase/compat";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../config/firebase";
import { userStateService } from "./state.service";
// example for time stamp
// firebase.firestore.Timestamp.fromDate(new Date('December 17, 1995 03:24:00'))
// const [user, setUser] = useState<any>(null);

const getUserById = async (id: string) => {
  const userDataState = userStateService();
  const docRef = doc(database, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    data.id = docSnap.id;
    userDataState.setUserData(data);
  }
};

export default getUserById;
