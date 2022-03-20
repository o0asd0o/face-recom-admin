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
    sadFoodRating: number;
    happyFoodRating: number;
    surpriseFoodRating: number;
    angryFoodRating: number;
    imageUrl: string;
    name: string;
    price: number;
    ownerEmail?: string;
    createdDate?: FieldValue,
    updatedDate?: FieldValue,
}

export type WebPageData = {
    logoUrl: string;
    themeColor: string;
    storeName: string;
    description: string;
    landingImageUrl: string;
    facebookPage: string;
    contactNumber: string;
    ownerEmail?: string;
    updated?: boolean;
    updatedDate?: FieldValue;
}