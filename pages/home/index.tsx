import { useEffect } from "react";
import { userStateService } from "../../shared-components/services/state.service";

const Home = () => {
  const { user, setUserData } = userStateService();
  useEffect(() => {
    (async () => {
      console.log("hamedkabir  ", user);

      // how to get all users from DB
      // const colRef = collection(db, "users");
      // const snapshots = await getDocs(colRef);
      // const docs = snapshots.docs.map((doc) => {
      //   const data =doc.data();
      //   data.id= doc.id
      //   return data
      // });
      // how to get data from user
      // const docRef = doc(db, "users", user.uid);
      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   const data = docSnap.data();
      //   data.id = docSnap.id;
      //   console.log("hamedkabir ", data);
      // }
    })();
  }, []);
  return <h1>Page Home</h1>;
};
export default Home;
