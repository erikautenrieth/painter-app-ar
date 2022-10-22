import firebase from "firebase/compat";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import db from "../../config/firebase";
import { useAuth } from "./auth-context";
// example for time stamp
// firebase.firestore.Timestamp.fromDate(new Date('December 17, 1995 03:24:00'))
// export const readData = (doc: string | undefined) => {
//   try {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(doc)
//       .onSnapshot(function (doc) {
//         console.log("hamedkabir  ", doc);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const writeData = (doc: string | undefined, value: any) => {
//   try {
//     firebase.firestore().collection("users").doc(doc).update(value);
//   } catch (error) {
//     console.log(error);
//   }
// };

export default function users() {
  const { user, setUser } = useAuth();
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "users");

      const snapshots = await getDocs(colRef);
      console.log("hamedkabir ", snapshots);
    })();
  }, []);
}
