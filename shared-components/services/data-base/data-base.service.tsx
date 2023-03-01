import { database } from "config/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export async function getDocumentById(id: string) {
  const docRef = doc(database, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    data.id = docSnap.id;
    return { id, ...data };
  } else {
    return null;
  }
}
