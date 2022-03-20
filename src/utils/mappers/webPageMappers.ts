import { serverTimestamp } from "firebase/firestore";
import { WebPageInformation } from "types";
import { WebPageData } from "types/server";

const mapWebPageData = (
  data: WebPageInformation,
  logoImagePath: string,
  bannerImagePath: string,
): WebPageData => {

    return {
        themeColor: data.themeColor,
        storeName: data.storeName,
        description: data.slogan,
        facebookPage: data.facebookPage,
        contactNumber: data.contactNumber,
        landingImageUrl: bannerImagePath || String(data.landingImage),
        logoUrl: logoImagePath || String(data.logo),
    };
};

export const mapWebPageDataForAdd = (
    data: WebPageInformation,
    logoImagePath: string,
    bannerImagePath: string,
    ownerEmail: string
) => {
  const webPageData = mapWebPageData(data, logoImagePath, bannerImagePath);
  return {
    ...webPageData,
    ownerEmail: ownerEmail,
    updatedDate: serverTimestamp(),
  }
};

export const mapWebPageDataForUpdate = (
    data: WebPageInformation,
    logoImagePath: string,
    bannerImagePath: string
) => {
  const webPageData = mapWebPageData(data, logoImagePath, bannerImagePath);
  return {
    ...webPageData,
    updated: true,
    updatedDate: serverTimestamp(),
  };
}


export const mapDefaultWebPageData = (email: string) => {
  return {
    ownerEmail: email,
    description: "",
    landingImageUrl: "",
    logoUrl: "",
    storeName: "",
    themeColor: "",
    facebookPage: "",
    contactNumber: "",
    updated: false,
  }
}