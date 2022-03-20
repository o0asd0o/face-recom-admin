import { Button, Container, TextField, Typography, Alert, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

import { LoginCreds } from "types";

import { ThemeProvider } from "@mui/system";
import { theme } from "themes/themes";
import { signInEmailPassword } from "providers/firebase";
import { ForgotPasswordText, Form, HuskeeHeaderImage, ImageBanner,
    ImageContainer,
    InputContainer, Logo, MainCard, RouteLink, Title } from "./styled/StyledLoginPage";
import { useNavigate } from "react-router-dom";
import { emailExists } from "providers/users";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PaswordWithMask from "components/PaswordWithMask";


const validation = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required'),
});

const initialValues: LoginCreds = {
    email: '',
    password: '',
}


const LoginPage: React.FC = () => {
    const [error, setError] = React.useState<string>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignIn = async ({ email, password }: LoginCreds) => {
        try {
            setLoading(true)
            const isEmailExists = await emailExists(email);
            if (isEmailExists) {
                const response = await signInEmailPassword(email, password);

                if (response) {
                    navigate("/home");
                } else {
                    setError("Request failed, please try again")
                }
            } else {
                setError("Email doesn't exists!")
            }
        } catch (error) {
            setError("Invalid email or password")
        } finally {
            setLoading(false)
        }
    };

    const form = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit: handleSignIn,
    })

    return (
        <ThemeProvider theme={theme}>
            <Container fixed sx={{ paddingBottom: "40px" }}>
                <MainCard variant="outlined">
                    <Form onSubmit={form.handleSubmit}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Logo src="/images/login-logo.png" alt="Logo"/>
                        </div>
                        
                        <InputContainer>
                            <Typography sx={{ marginBottom: "30px" }}>
                                <strong>Login</strong> to view and manage your Resto!
                            </Typography>
                            {error && (
                                <Alert severity="error" sx={{ width: "100%", marginBottom: "30px" }}>
                                    {error}
                                </Alert>
                            )}
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                variant="outlined"
                                autoComplete='off'
                                value={form.values.email}
                                onBlur={form.handleBlur}
                                onChange={form.handleChange}
                                error={form.touched.email && Boolean(form.errors.email)}
                                helperText={form.touched.email && form.errors.email}
                                sx={{ marginBottom: "10px" }}
                            />
                            <PaswordWithMask
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                autoComplete='off'
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.password && Boolean(form.errors.password)}
                                helperText={form.touched.password && form.errors.password}
                                sx={{ marginBottom: "15px" }}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth type="submit"
                                sx={{ maxWidth: "250px", mt: 4 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={25} /> : "Login"}
                            </Button>
                            <Typography sx={{ fontSize: "14px", marginTop: "20px"}}>
                                Not a member? <RouteLink to="/register">Sign Up</RouteLink>
                            </Typography>
                        </InputContainer>
                    </Form>
                    <ImageContainer>
                        <ImageBanner />
                    </ImageContainer>
                </MainCard>
            </Container>
        </ThemeProvider>
    )
}

export default LoginPage