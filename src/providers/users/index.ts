import { getDocs, where, query } from "firebase/firestore";
import { usersCollection } from "providers/firebase";

export const emailExists = async (
    email: string
): Promise<boolean> => {

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