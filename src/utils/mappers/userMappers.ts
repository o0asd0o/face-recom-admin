import { serverTimestamp } from "firebase/firestore";
import { UserInformation } from "types";
import { UserData } from "types/server";

export const mapUserData = (
  data: UserInformation,
  userImagePath: string,
): UserData => {
    return {
        avatarUrl: userImagePath,
        address: data.address,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        createdDate: serverTimestamp(),
        updatedDate: serverTimestamp(),
        status: "pending",
        role: "owner"
  };
}