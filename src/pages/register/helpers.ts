import * as yup from "yup";
import { validateFileSize } from "utils/helpers";

/**
 *  avatar: File | null | string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
 */
export const validation = yup.object({
  avatar: yup
    .mixed()
    .required("Avatar is required")
    .test(
      "fileSize",
      "File size too large, max file size is 1 Mb",
      validateFileSize
    )
    .test(
      "fileType",
      "Incorrect file type",
      (file) =>
        file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
    ),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should have 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special characters"
    ),
  phoneNumber: yup.string(),
});
