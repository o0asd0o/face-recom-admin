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

const validation = yup.object({
    foodRating: yup.number().required("Food rating is required"),
    image: yup.mixed(),
    name: yup.string().required("Product name is required"),
    price: yup.number().required("Price is required"),
});

const initialValues: ProductInformation = {
  foodRating: 0,
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
            let productImagePath = "";
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
    validationSchema: validation,
    enableReinitialize: true,
    onSubmit: handleUpdateProduct,
  });
  useEffect(() => {
    if (!userInfo?.email) return;
    setLoading(true);

    const unsub = onProductsSnapshot((snapshot) => {
        const productsResult: Array<ProductInformation> = [];
        snapshot.forEach((doc) => {
            productsResult.push({
                id: doc.id,
                foodRating: doc.data().foodRating,
                image: doc.data().imageUrl,
                name: doc.data().name,
                price: doc.data().price,
            });
        });

        console.log({ productsResult, res: productsResult.find((item) => item.id === productId)});

        setSelectedProduct(productsResult.find((item) => item.id === productId));
        setLoading(false);
    }, userInfo?.email);

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
          {loading ? <CircularProgress size={25} /> : "Update"}
        </Button>
      </Stack>
    </Form>
  );
};

export default EditProductForm;
