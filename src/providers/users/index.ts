import { getDocs, where, query, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { usersCollection } from "providers/firebase";

export const onUsersSnapshot = (
  observer: (snashot: QuerySnapshot<DocumentData>) => void,
  role?: "admin" | "owner"
) => {
  let resQuery = query(usersCollection);

  if (role) {
    resQuery = query(usersCollection, where('role', '==', role));
  } 

  return onSnapshot(resQuery, observer)
};

export const emailExists = async (
    email: string
): Promise<any> => {

    const emailsSnapshot = await getDocs(
        query(
            usersCollection,
            where('email', '==', email)
        )
    );

    if (emailsSnapshot.size > 0) {
        const user = emailsSnapshot.docs[0]
        return {
            isEmailExists: true,
            status: user.data().status,
        }
    }
    return {
        isEmailExists: false,
        status: '',
    }
};

export const emailApproved = async (email: string): Promise<boolean> => {
    const emailsSnapshot = await getDocs(
        query(
            usersCollection,
            where('email', '==', email)

        )
    );

    return emailsSnapshot.size > 0;
};


export const getCurrentUser = async (email: string) => {
    const usersSnapshot = await getDocs(
        query(
            usersCollection,
            where('email', '==', email)
        )
    );
    
    return usersSnapshot.docs[0];
}