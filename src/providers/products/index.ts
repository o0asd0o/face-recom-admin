import { deleteDoc, doc, DocumentData, getFirestore, onSnapshot, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { productsCollection } from "providers/firebase";
import { ProductData } from "types/server";

const firestoreRef = getFirestore();

export const onProductsSnapshot = (
  observer: (snashot: QuerySnapshot<DocumentData>) => void,
  ownerEmail: string,
  isOwner: boolean,
) => {
  let resQuery = query(productsCollection)
  if (isOwner) {
    resQuery = query(productsCollection, where('ownerEmail', '==', ownerEmail))
  }

  return onSnapshot(resQuery, observer)
};

export const updateProductDoc = async (
  productId: string,
  data: ProductData
) =>
  await updateDoc(
    doc(firestoreRef, 'products', productId),
    data
  );

export const deleteProductDoc = async (productId: string) => await deleteDoc(doc(firestoreRef, 'products', productId));