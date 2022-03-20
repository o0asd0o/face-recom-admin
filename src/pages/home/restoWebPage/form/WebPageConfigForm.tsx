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
import { Color, ColorPicker, createColor } from "mui-color";
import UploadImage from "components/UploadImage";
import { uploadWebPageImage } from "providers/firebase";
import { toast } from "react-toastify";
import { WebPageInformation } from "types";
import { useAuth } from "context/authContext";
import styled from "@emotion/styled";
import { onWebPageSnapshot, updateWebPageDoc } from "providers/webPage";
import { palette } from "themes/themes";
import { BannerContainer } from "./styled/WebPageStyled";
import { mapWebPageDataForUpdate } from "utils/mappers/webPageMappers";
import { WebPageData } from "types/server";
import { Call, Facebook, FindReplace } from "@mui/icons-material";
import styles from "./WebPageConfigForm.module.scss";

export const Form = styled("form")`

`

const validation = yup.object({
    logo: yup.mixed(),
    themeColor: yup.string(),
    storeName: yup.string().required("Store Name is required"),
    slogan: yup.string().required("Slogan/Description is required"),
    landingImage: yup.mixed(),
});

const initialValues: WebPageInformation = {
  logo: null,
  themeColor: "",
  themeColorObj: "#333",
  storeName: "",
  slogan: "",
  landingImage: "",
  facebookPage: "",
  contactNumber: ""
};

const WebPageConfigForm: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentWebPage, setCurretWebPage] = useState<WebPageInformation>();
  const { userInfo } = useAuth();

  const handleUpdateWebPage = React.useCallback(
    async ({ id, ...values }: WebPageInformation) => {
        setLoading(true);

        const editWebPageProcesses = async () => {
            let logoImagePath = "";
            if (typeof values.logo !== "string" && values.logo !== null) {
                logoImagePath = await uploadWebPageImage(values.logo);
            }

            let bannerImagePath = "";
            if (typeof values.landingImage !== "string" && values.landingImage !== null) {
                bannerImagePath = await uploadWebPageImage(values.landingImage);
            }

            const webPageData: WebPageData = mapWebPageDataForUpdate(values, logoImagePath, bannerImagePath);

            if (!currentWebPage?.id) {
              throw Error('Error');
            }

            await updateWebPageDoc(currentWebPage?.id, webPageData);
        };

        return await toast.promise(editWebPageProcesses, {
            pending: "Updating web page...",
            success: "Successfuly updated web page!",
            error: "Error while processing the request",
        })
        .finally(() => setLoading(false));
    },
    [userInfo, currentWebPage]
  );

  const form = useFormik<WebPageInformation>({
    initialValues: currentWebPage || initialValues,
    validationSchema: validation,
    enableReinitialize: true,
    onSubmit: handleUpdateWebPage,
  });

  useEffect(() => {
    if (!userInfo?.email) return;
    setLoading(true);

    const unsub = onWebPageSnapshot((snapshot) => {
        const webPageResult: Array<WebPageInformation> = [];
        snapshot.forEach((doc) => {
            webPageResult.push({
                id: doc.id,
                logo: doc.data().logoUrl,
                storeName: doc.data().storeName,
                slogan: doc.data().description,
                themeColor: doc.data().themeColor,
                landingImage: doc.data().landingImageUrl,
                themeColorObj: createColor(doc.data().themeColor),
                facebookPage: doc.data().facebookPage,
                contactNumber: doc.data().contactNumber
            });
        });

        setCurretWebPage(webPageResult[0]);
        setLoading(false);
    }, userInfo?.email);

    return () => unsub();
  }, [userInfo?.email]);

  const handleChange = React.useCallback((value: Color) => {
    form.setFieldValue('themeColorObj', value);
    form.setFieldValue('themeColor', value.raw);
  }, [form]);

  return (
    <Form onSubmit={form.handleSubmit}>
      <Grid container sx={{ mb: 0.5 }}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ color: "#4a4a4c", mb: "12px" }}>
            Customize your web page
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={4} sx={{ mt: 0.1 }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
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
              Logo Image:
            </Typography>
            <UploadImage
              value={form.values.logo}
              onChange={(file) => form.setFieldValue("logo", file)}
              defaultImage="/images/logo-placeholder.png"
              name="image"
            />
            {form.errors.logo && (
              <ErrorMessage>{form.errors.logo}</ErrorMessage>
            )}
          </AvatarContainer>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}   
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack spacing={2}>
           <TextField
              fullWidth
              name="storeName"
              label="Store Name"
              variant="outlined"
              autoComplete="off"
              value={form.values.storeName}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={form.touched.storeName && Boolean(form.errors.storeName)}
              helperText={form.touched.storeName && form.errors.storeName}
            />
            <TextField
              fullWidth
              name="slogan"
              label="Slogan / Description"
              variant="outlined"
              autoComplete="off"
              value={form.values.slogan}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={form.touched.slogan && Boolean(form.errors.slogan)}
              helperText={form.touched.slogan && form.errors.slogan}
            />
            <div className={styles.themeColor}>
              <Typography>
                Choose Theme Color
              </Typography>
              <ColorPicker value={form.values.themeColorObj} palette={palette} onChange={(value) => handleChange(value as Color)} />
            </div>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <TextField
              fullWidth
              name="facebookPage"
              label="Facebook Page"
              variant="outlined"
              autoComplete="off"
              value={form.values.facebookPage || ""}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={form.touched.facebookPage && Boolean(form.errors.facebookPage)}
              helperText={form.touched.facebookPage && form.errors.facebookPage}
              InputProps={{
                  endAdornment:<Facebook />
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              name="contactNumber"
              label="Contact #"
              variant="outlined"
              autoComplete="off"
              value={form.values.contactNumber || ""}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={form.touched.contactNumber && Boolean(form.errors.contactNumber)}
              helperText={form.touched.contactNumber && form.errors.contactNumber}
              InputProps={{
                  endAdornment: <Call />
              }}
            />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography sx={{ mb: "5px" }}>
            Upload Banner Image
          </Typography>
          <BannerContainer>
            <UploadImage
              style={{ width: "full", height: 500 }}
              value={form.values.landingImage}
              onChange={(file) => form.setFieldValue("landingImage", file)}
              defaultImage="/images/image-placeholder.png"
              imageStyle={{ width: "100%" }}
              name="landingImage"
            />
            {form.errors.landingImage && (
              <ErrorMessage>{form.errors.landingImage}</ErrorMessage>
            )}
          </BannerContainer>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
          sx={{ maxWidth: "150px", ml: "auto" }}
        >
          {loading ? <CircularProgress size={25} /> : "Save"}
        </Button>
      </Stack>
    </Form>
  );
};

export default WebPageConfigForm;
