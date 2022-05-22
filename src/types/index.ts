import { ColorValue } from "mui-color";

export type Status = "pending" | "approved" | "declined";

export type LoginCreds = {
  email: string;
  password: string;
};

export type RegistrationDetails = {
  avatar: File | null | string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  status?: Status;
};

export type UserInformation = Omit<RegistrationDetails, "password">;

export type ProductInformation = {
  id?: string;
  sadFoodRating: number;
  happyFoodRating: number;
  image: File | null | string;
  name: string;
  price: number;
  categories: string[];
  ownerEmail?: string;
};

export type WebPageInformation = {
  id?: string;
  logo: File | null | string;
  featured: File | null | string;
  themeColor: string;
  themeColorObj: ColorValue;
  storeName: string;
  slogan: string;
  landingImage: File | null | string;
  facebookPage: string;
  contactNumber: string;
  address: string;
};

export type WebPage = {
  id?: string;
  logo: File | null | string;
  featured: File | null | string;
  themeColor: string;
  storeName: string;
  slogan: string;
  landingImage: File | null | string;
  facebookPage: string;
  contactNumber: string;
  addres: string;
};

export type Product = {
  id?: string;
  sadFoodRating: number;
  happyFoodRating: number;
  imageUrl: string;
  name: string;
  ownerEmail: string;
  price: number;
  categories: string[];
};

export type CurrentUser = {
  id: string;
  avatarUrl: string;
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: "owner" | "admin";
};

export type Customer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
};

export type RestoOwner = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  address: string;
  status?: string;
};
