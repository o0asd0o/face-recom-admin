import { DocumentData, onSnapshot, query, QuerySnapshot } from "firebase/firestore";
import { customersCollection } from "providers/firebase";

export const onCustomersSnapshot = (
  observer: (snashot: QuerySnapshot<DocumentData>) => void,
) => {
  const resQuery = query(customersCollection);

  return onSnapshot(resQuery, observer)
};