import { serverTimestamp } from "firebase/firestore";
import { WebPageInformation } from "types";
import { WebPageData } from "types/server";

const mapWebPageData = (
  data: WebPageInformation,
  logoImagePath: string,
  featuredImagePath: string,
  bannerImagePath: string,
): WebPageData => {

    return {
        themeColor: data.themeColor,
        storeName: data.storeName,
        description: data.slogan,
        facebookPage: data.facebookPage,
        contactNumber: data.contactNumber,
        address: data.address,
        landingImageUrl: bannerImagePath || String(data.landingImage),
        logoUrl: logoImagePath || String(data.logo),
        featuredUrl: featuredImagePath || String(data.featured),
    };
};

export const mapWebPageDataForAdd = (
    data: WebPageInformation,
    logoImagePath: string,
    featuredImagePath: string,
    bannerImagePath: string,
    ownerEmail: string
) => {
  const webPageData = mapWebPageData(data, logoImagePath, featuredImagePath, bannerImagePath);
  return {
    ...webPageData,
    ownerEmail: ownerEmail,
    updatedDate: serverTimestamp(),
  }
};

export const mapWebPageDataForUpdate = (
    data: WebPageInformation,
    logoImagePath: string,
    featuredImagePath: string,
    bannerImagePath: string
) => {
  const webPageData = mapWebPageData(data, logoImagePath, featuredImagePath, bannerImagePath);
  return {
    ...webPageData,
    updated: true,
    updatedDate: serverTimestamp(),
  };
}


export const mapDefaultWebPageData = (email: string, address: string) => {
  return {
    ownerEmail: email,
    address,
    description: "",
    landingImageUrl: "",
    logoUrl: "",
    featuredUrl: "",
    storeName: "",
    themeColor: "",
    facebookPage: "",
    contactNumber: "",
    updated: false,
  }
}