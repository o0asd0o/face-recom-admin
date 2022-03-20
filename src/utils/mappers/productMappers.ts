import { serverTimestamp } from "firebase/firestore";
import { ProductInformation } from "types";
import { ProductData } from "types/server";

const mapProductData = (
  data: ProductInformation,
  productImagePath: string,
): ProductData => {
    return {
      happyFoodRating: data.happyFoodRating || 0,
      surpriseFoodRating: data.surpriseFoodRating || 0,
      angryFoodRating: data.angryFoodRating || 0,
      sadFoodRating: data.sadFoodRating || 0,
      imageUrl: productImagePath,
      name: data.name,
      price: data.price,
  };
};

export const mapProductDataForAdd = (data: ProductInformation, productImagePath: string, ownerEmail: string) => {
  const productData = mapProductData(data, productImagePath);
  return {
    ...productData,
    ownerEmail: ownerEmail,
    createdDate: serverTimestamp(),
    updatedDate: serverTimestamp(),
  }
};

export const mapProductDataForUpdate = (data: ProductInformation, productImagePath: string) => {
  const productData = mapProductData(data, productImagePath);
  return {
    ...productData,
    updatedDate: serverTimestamp(),
  };
}