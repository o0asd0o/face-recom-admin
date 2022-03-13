import { FieldValue } from "firebase/firestore";

export type UserData = {
    avatarUrl: string,
    address: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    createdDate: FieldValue,
    updatedDate: FieldValue,
    role: "owner" | "admin"
};

export type ProductData =  {
    foodRating: number;
    imageUrl: string;
    name: string;
    price: number;
    ownerEmail?: string;
    createdDate?: FieldValue,
    updatedDate?: FieldValue,
}