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
  key: number
) {
  const test = `player1Position_${0}`;
  const test1 = `player1Position_${1}`;
  const docKey = hostingId;
  const docRef = doc(database, `host/${docKey}`);
  switch (key) {
    case -1:
      await updateDoc(docRef, {
        player1Position: payload,
      });
      break;

    case 0:
      await updateDoc(docRef, {
        [test]: payload,
      });
      break;

    case 1:
      await updateDoc(docRef, {
        [test1]: payload,
      });
      break;

    default:
      break;
  }
}
