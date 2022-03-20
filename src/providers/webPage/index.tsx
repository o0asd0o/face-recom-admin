import { doc, DocumentData, getFirestore, onSnapshot, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { webPagesCollection } from "providers/firebase";
import { WebPageData } from "types/server";

const firestoreRef = getFirestore();

export const onWebPageSnapshot = (
  observer: (snashot: QuerySnapshot<DocumentData>) => void,
  ownerEmail: string,
) => {
  const resQuery = query(webPagesCollection, where('ownerEmail', '==', ownerEmail))

  return onSnapshot(resQuery, observer)
};

export const updateWebPageDoc = async (
  webPageId: string,
  data: WebPageData
) =>
  await updateDoc(
    doc(firestoreRef, 'webPages', webPageId),
    data
  );
