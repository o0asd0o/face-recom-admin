import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Form } from "./styled/StyledAddProduct";
import * as yup from "yup";
import {
  AvatarContainer,
  ErrorMessage,
} from "pages/register/styled/StyledRegisterPage";
import UploadImage from "components/UploadImage";
import { productsCollection, uploadProductImage } from "providers/firebase";
import { toast } from "react-toastify";
import { ProductInformation } from "types";
import { mapProductDataForAdd } from "utils/mappers/productMappers";
import { validateFileSize } from "utils/helpers";
import { ProductData } from "types/server";
import { addDoc } from "firebase/firestore";
import { useAuth } from "context/authContext";

type Props = {
  onBack: () => void;
};

const validation = yup.object({
    foodRating: yup.number().required("Food rating is required"),
    image: yup
        .mixed()
        .required('Product image is required')
        .test(
            'fileSize',
            'File size too large, max file size is 1 Mb',
            validateFileSize
        )
        .test(
            'fileType',
            'Incorrect file type',
            (file) =>
                file &&
                [
                  'image/png',
                  'image/jpg',
                  'image/jpeg'
                ].includes(file.type)
        ),
    name: yup.string().required("Product name is required"),
    price: yup.number().required("Price is required"),
});

const initialValues: ProductInformation = {
  foodRating: 0,
  image: null,
  name: "",
  price: 1,
};

const AddProductForm: React.FC<Props> = ({ onBack }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { userInfo } = useAuth();

  const handleAddProduct = React.useCallback(
    async ({ roasterInput: _, ...values }) => {
        setLoading(true);

        const addProductProcesses = async () => {
            let productImagePath = "";
            if (typeof values.image !== "string" && values.image !== null) {
                productImagePath = await uploadProductImage(values.image);
            }

            const productData: ProductData = mapProductDataForAdd(
                values,
                productImagePath,
                userInfo?.email || ''
            );
            await addDoc(productsCollection, productData);

            form.resetForm();
        };

        return await toast.promise(addProductProcesses, {
            pending: "Adding product...",
            success: "Successfuly add product!",
            error: "Error while processing the request",
        })
        .finally(() => setLoading(false));
    },
    [userInfo]
  );

  const form = useFormik<ProductInformation>({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: handleAddProduct,
  });

  return (
    <Form onSubmit={form.handleSubmit}>
      <Grid container sx={{ mb: 0.5 }}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ color: "#4a4a4c", mb: "12px" }}>
            Product Information
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={4} sx={{ mt: 0.1 }}>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AvatarContainer>
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: "-20px",
                fontStyle: "italic",
              }}
            >
              Product image:
            </Typography>
            <UploadImage
              value={form.values.image}
              onChange={(file) => form.setFieldValue("image", file)}
              defaultImage="/images/product-placeholder.png"
              name="image"
            />
            {form.errors.image && (
              <ErrorMessage>{form.errors.image}</ErrorMessage>
            )}
          </AvatarContainer>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="name"
              label="Product Name"
              variant="outlined"
              autoComplete="off"
              value={form.values.name}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={form.touched.name && Boolean(form.errors.name)}
              helperText={form.touched.name && form.errors.name}
            />
            <TextField
              fullWidth
              name="price"
              label="Price (PHP)"
              variant="outlined"
              inputProps={{ min: 1 }}
              type="number"
              autoComplete="off"
              value={form.values.price}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={form.touched.price && Boolean(form.errors.price)}
              helperText={form.touched.price && form.errors.price}
          />
          <TextField
              fullWidth
              name="foodRating"
              label="Food Rating (0-12)"
              variant="outlined"
              inputProps={{ min: 0, max: 12 }}
              type="number"
              autoComplete="off"
              value={form.values.foodRating}
              onBlur={form.handleBlur}
              onChange={({ target }) => {
                const { value } = target;
                form.setFieldValue('foodRating', Math.max(0, Math.min(12, parseInt(value))));
              }}
              error={form.touched.foodRating && Boolean(form.errors.foodRating)}
              helperText={form.touched.foodRating && form.errors.foodRating }
          />
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2, mt: 15 }} />
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Button
          onClick={onBack}
          color="primary"
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: "150px",
            mr: "10px",
            ml: "auto",
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
          sx={{ maxWidth: "150px" }}
        >
          {loading ? <CircularProgress size={25} /> : "Add Product"}
        </Button>
      </Stack>
    </Form>
  );
};

export default AddProductForm;
