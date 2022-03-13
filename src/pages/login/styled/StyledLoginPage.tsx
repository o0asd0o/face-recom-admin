import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const HuskeeHeaderImage = styled("img")`
    height: 63px;
    @media screen and (max-width: 1200px) {
        max-width: 340px;
        width: 100%;
        height: auto;
    }
`

export const ImageContainer = styled("div")`
    width: 50%;
    height: 100%;
    position: relative;
    @media screen and (max-width: 900px) {
       display: none;
    }
`
export const ImageBanner = styled("div")`
    width: 100%;
    background: url(/images/login-banner.jpg);
    background-size: cover;
    height: 100%;
    background-position: center;
`

export const Form = styled("form")`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    position: relative;


    @media screen and (max-width: 900px) {
        width: 100%;
    }
`

export const InputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 20px;
    max-width: 380px;
`

export const Title = styled(Typography)`
    font-family: "Rubik", sans-serif;
    font-weight: 700;

    @media screen and (max-width: 900px) {
        font-size: 28px;
    }
`

export const RouteLink = styled(Link)`
    text-decoration: none;
    color: #8c0032;

    &:hover {
        text-decoration: underline;
    }
`

export const ForgotPasswordText = styled(Typography)`
    font-size: 14px;
    margin-bottom: 50px;
    width: 100%;
    text-align: right;
`

export const MainCard = styled(Card)`
    display: flex;
    max-width: 1200px;
    max-height: 800px;
    min-height: 600px;
    height: 100vh;
    margin-top: 40px;
`

export const Logo = styled('img')`
    width: 150px;
    height: auto;
`