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
};

export type UserInformation = Omit<
  RegistrationDetails,
  'password'
>;

export type ProductInformation = {
  id?: string;
  foodRating: number;
  image: File | null | string;
  name: string;
  price: number;
}

export type Product = {
  id?: string;
  foodRating: number;
  imageUrl: string;
  name: string;
  ownerEmail: string;
  price: number;
}

export type CurrentUser = { 
    id: string;
    avatarUrl: string,
    address: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    role: "owner" | "admin"
}