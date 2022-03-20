import React from "react";
import { ThemeProvider } from "@mui/system";
import { useFormik } from "formik";

import { theme } from "themes/themes";
import { Container, Typography, Button } from "@mui/material";

import { MainCard, Form, ImageBanner, Title1, Title2, BackdropRight, CardContainer,
    Body, FieldsContainer, AvatarContainer, Footer, ReactLink, FooterLink, ErrorMessage
} from "./styled/StyledRegisterPage";

import UploadImage from "components/UploadImage";
import { RegistrationDetails } from "types";
import MainFields from "./MainFields";
import {  validation } from "./helpers";
import { addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { registerWithEmailPassword, uploadUsersImage, usersCollection, webPagesCollection } from "providers/firebase";
import { mapDefaultWebPageData, mapUserData } from "utils/mappers/userMappers";
import { UserData, WebPageData } from "types/server";
import { Logo } from "pages/login/styled/StyledLoginPage";

const initialValues: RegistrationDetails = {
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
}

const handleSubmit = async ({ password, ...otherDetails}: RegistrationDetails) => {
    const registrationProcesses = async () => {
        await registerWithEmailPassword(otherDetails.email, password)

        let userImagePath = "";
        if (typeof otherDetails.avatar !== "string" && otherDetails.avatar !== null) {
            userImagePath = await uploadUsersImage(otherDetails.avatar);
        }

        const userData: UserData = mapUserData(otherDetails, userImagePath);
        const webPageData: WebPageData = mapDefaultWebPageData(otherDetails.email);

        await addDoc(webPagesCollection, webPageData)
        await addDoc(usersCollection, userData);
    };

    return await toast.promise(registrationProcesses, {
        pending: 'User registration in progress...',
        success: 'Successfuly registered!',
        error: {
            render: (err) => {
                const { data } = err;
                const error = data as { code: string };
                console.log(err);
                if (error.code === 'auth/email-already-in-use') {
                    return 'That email address is already in use!';
                } else if (error.code === 'auth/invalid-email') {
                    return 'That email address is invalid!';
                }

                return JSON.stringify(error);
            }
        },
    })
}

const RegisterPage: React.FC = () => {

    const form = useFormik<RegistrationDetails>({
        initialValues,
        validationSchema: validation,
        onSubmit: handleSubmit,
    })

    return <ThemeProvider theme={theme}>
        <Container fixed sx={{ paddingBottom: "40px" }}>
            <MainCard variant="outlined">
                <ImageBanner>
                    <Logo
                        src="/images/login-logo.png"
                        alt="Face Recom Logo"
                    />
                </ImageBanner>
                <BackdropRight>
                    <Title1 variant="h2">Food Finder Portal</Title1>
                    <Typography sx={{ marginTop: "20px" }}>
                        Register as a <strong>Resto Owner</strong> and join the community. 
                    </Typography>
                </BackdropRight>
                <Form onSubmit={form.handleSubmit}>
                    <CardContainer>
                        <Body>
                            <Title2 variant="h3">
                                Registration
                            </Title2>
                            <Typography sx={{ marginTop: "10px" }}> 
                                Enter your contact and persoanal information below.
                            </Typography>
                            <FieldsContainer>
                                <AvatarContainer>
                                    <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                                        Upload your avatar:
                                    </Typography>
                                    <UploadImage
                                        value={form.values.avatar} 
                                        onChange={(file) => form.setFieldValue("avatar", file)}
                                        name="avatar"
                                    />
                                    {form.errors.avatar &&  (
                                        <ErrorMessage>{form.errors.avatar}</ErrorMessage>
                                    )}
                                </AvatarContainer>
                                <MainFields form={form} />
                            </FieldsContainer>
                        </Body>

                        <Footer>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth type="submit"
                                sx={{ maxWidth: "150px", mt: 0, ml: "auto" }}
                            >
                                Register
                            </Button>
                        </Footer>
                    </CardContainer>
                    <FooterLink>
                        Already have an account?&nbsp;<ReactLink to="/login">Login Here</ReactLink>
                    </FooterLink>
                </Form>
            </MainCard>
        </Container>
    </ThemeProvider>
}

export default React.memo(RegisterPage);