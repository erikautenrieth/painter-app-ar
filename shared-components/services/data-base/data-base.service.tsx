import { database } from "config/firebase";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { IPainter } from "shared-components/interfaces/painter.interface";

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
export async function updateHostingDoc(
  hostingId: string | undefined,
  payload: IPainter[],
  docKey: string
) {
  const docID = hostingId;
  const docRef = doc(database, `host/${docID}`);

  await updateDoc(docRef, {
    [docKey]: payload,
  });
}
