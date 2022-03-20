import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import {
  AvatarContainer,
  ErrorMessage,
} from "pages/register/styled/StyledRegisterPage";
import UploadImage from "components/UploadImage";
import { uploadProductImage } from "providers/firebase";
import { toast } from "react-toastify";
import { Product, ProductInformation } from "types";
import { mapProductDataForUpdate } from "utils/mappers/productMappers";
import { validateFileSize } from "utils/helpers";
import { ProductData } from "types/server";
import { useAuth } from "context/authContext";
import styled from "@emotion/styled";
import { onProductsSnapshot, updateProductDoc } from "providers/products";
import { useParams } from "react-router-dom";

type Props = {
  onBack: () => void;
};

export const Form = styled("form")`

`

const getValidation = (isAdmin: boolean) => yup.object({
    ...(isAdmin ? {
      happyFoodRating: yup.number().required("Happy Food rating is required"),
      angryFoodRating: yup.number().required("Angry Food rating is required"),
      surpriseFoodRating: yup.number().required("Surprise Food rating is required"),
      sadFoodRating: yup.number().required("Sad Food rating is required"),
    }: {}),
    image: yup.mixed(),
    name: yup.string().required("Product name is required"),
    price: yup.number().required("Price is required"),
});

const initialValues: ProductInformation = {
  sadFoodRating: 0,
  happyFoodRating: 0,
  angryFoodRating: 0,
  surpriseFoodRating: 0,
  image: null,
  name: "",
  price: 1,
};

const EditProductForm: React.FC<Props> = ({ onBack }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductInformation>();
  const { userInfo } = useAuth();
  const { productId } = useParams(); 

  const handleUpdateProduct = React.useCallback(
    async ({ id, ...values }) => {
        setLoading(true);

        const editProductProcesses = async () => {
            let productImagePath = values.image;
            if (typeof values.image !== "string" && values.image !== null) {
                productImagePath = await uploadProductImage(values.image);
            }

            const productData: ProductData = mapProductDataForUpdate(
                values,
                productImagePath,
            );

            await updateProductDoc(id, productData)
        };

        return await toast.promise(editProductProcesses, {
            pending: "Updating product...",
            success: "Successfuly updated product!",
            error: "Error while processing the request",
        })
        .finally(() => setLoading(false));
    },
    [userInfo]
  );

  const form = useFormik<ProductInformation>({
    initialValues: selectedProduct || initialValues,
    validationSchema: getValidation(userInfo?.role === "admin"),
    enableReinitialize: true,
    onSubmit: handleUpdateProduct,
  });
  useEffect(() => {
    if (!userInfo?.email || !userInfo.role) return;
    const { email, role } = userInfo;
    setLoading(true);

    const unsub = onProductsSnapshot((snapshot) => {
        const productsResult: Array<ProductInformation> = [];
        snapshot.forEach((doc) => {
            productsResult.push({
                id: doc.id,
                sadFoodRating: doc.data().sadFoodRating || 0,
                angryFoodRating: doc.data().angryFoodRating || 0,
                happyFoodRating: doc.data().happyFoodRating || 0,
                surpriseFoodRating: doc.data().surpriseFoodRating || 0,
                image: doc.data().imageUrl,
                name: doc.data().name,
                price: doc.data().price,
            });
        });

        setSelectedProduct(productsResult.find((item) => item.id === productId));
        setLoading(false);
    }, email, role === "owner");

    return () => unsub();
  }, [userInfo?.email, productId]);

  return (
    <Form onSubmit={form.handleSubmit}>
      <Grid container sx={{ mb: 0.5 }}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ color: "#4a4a4c", mb: "12px" }}>
            Product Information
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={4} sx={{ mt: 0.1 }}>
        <Grid
          item
          xs={12}
          sm={4}
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
        <Grid item xs={12} sm={8}>
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
            {userInfo?.role === "admin" && (<>
              <TextField
                  fullWidth
                  name="happyFoodRating"
                  label="Happy Food Rating (0-12)"
                  variant="outlined"
                  inputProps={{ min: 0, max: 12 }}
                  type="number"
                  autoComplete="off"
                  value={form.values.happyFoodRating}
                  onBlur={form.handleBlur}
                  onChange={({ target }) => {
                    const { value } = target;
                    form.setFieldValue('happyFoodRating', Math.max(0, Math.min(12, parseInt(value))));
                  }}
                  error={form.touched.happyFoodRating && Boolean(form.errors.happyFoodRating)}
                  helperText={form.touched.happyFoodRating && form.errors.happyFoodRating }
              />
              <TextField
                  fullWidth
                  name="sadFoodRating"
                  label="Sad Food Rating (0-12)"
                  variant="outlined"
                  inputProps={{ min: 0, max: 12 }}
                  type="number"
                  autoComplete="off"
                  value={form.values.sadFoodRating}
                  onBlur={form.handleBlur}
                  onChange={({ target }) => {
                    const { value } = target;
                    form.setFieldValue('sadFoodRating', Math.max(0, Math.min(12, parseInt(value))));
                  }}
                  error={form.touched.sadFoodRating && Boolean(form.errors.sadFoodRating)}
                  helperText={form.touched.sadFoodRating && form.errors.sadFoodRating}
              />
              <TextField
                  fullWidth
                  name="surpriseFoodRating"
                  label="Happy Food Rating (0-12)"
                  variant="outlined"
                  inputProps={{ min: 0, max: 12 }}
                  type="number"
                  autoComplete="off"
                  value={form.values.surpriseFoodRating}
                  onBlur={form.handleBlur}
                  onChange={({ target }) => {
                    const { value } = target;
                    form.setFieldValue('surpriseFoodRating', Math.max(0, Math.min(12, parseInt(value))));
                  }}
                  error={form.touched.surpriseFoodRating && Boolean(form.errors.surpriseFoodRating)}
                  helperText={form.touched.surpriseFoodRating && form.errors.surpriseFoodRating}
              />
              <TextField
                  fullWidth
                  name="angryFoodRating"
                  label="Sad Food Rating (0-12)"
                  variant="outlined"
                  inputProps={{ min: 0, max: 12 }}
                  type="number"
                  autoComplete="off"
                  value={form.values.angryFoodRating}
                  onBlur={form.handleBlur}
                  onChange={({ target }) => {
                    const { value } = target;
                    form.setFieldValue('angryFoodRating', Math.max(0, Math.min(12, parseInt(value))));
                  }}
                  error={form.touched.angryFoodRating && Boolean(form.errors.angryFoodRating)}
                  helperText={form.touched.angryFoodRating && form.errors.angryFoodRating}
              />
            </>)}
            
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
          {loading ? <CircularProgress size={25} /> : "Update"}
        </Button>
      </Stack>
    </Form>
  );
};

export default EditProductForm;
