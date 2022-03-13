import styled from "@emotion/styled";
import { Card, Link, ToggleButton, Typography } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";

export const MainCard = styled(Card)`
    display: flex;
    max-width: 1200px;
    width: 100%;
    margin-top: 30px;
    flex-direction: column;

    @media screen and (min-width: 1200px) {
        height: 819px;
        flex-direction: row;
    }
`

export const Form = styled("form")`
    display: flex;
    flex-direction: column;
    align-items: baseline; 
    flex: 1;
    width: 100%;

    @media screen and (min-width: 1200px) {
        position: absolute;
        top: 160px; 
        width: 1150px;
        padding-left: 70px;
        padding-top: 60px;
    }
`

export const ImageBanner = styled("div")`
    width: 60%;
    background: url(/images/registration-banner.jpg);
    background-position: left;
    background-repeat: no-repeat;
    padding-left: 70px;
    padding-top: 20px;
    display: none;
    height: 100%;
    background-size: cover;

    @media screen and (min-width: 1200px) {
       display: block;
    }
`

export const HuskeeHeaderImage = styled("img")`
    max-width: 340px;
    width: 100%;
    height: auto;
    @media screen and (min-width: 1200px) {;
        height: 74px;
        max-width: unset;
        width: auto;
    }
`

export const Title1 = styled(Typography)`
    font-family: "Nunito", sans-serif;
    font-weight: 700;
    font-size: 28px;
    margin-top: 12px;

    @media screen and (min-width: 900px) {
        font-size: 36px;
    }
`

export const Title2 = styled(Typography)`
    font-family: "Nunito", sans-serif;
    font-weight: 700;
    font-size: 30px;

    @media screen and (max-width: 900px) {
        font-size: 25px;
    }
`

export const BackdropRight = styled("div")`
    padding: 20px 50px 20px 20px;
    width: 100%;

    @media screen and (min-width: 900px) {
        padding: 20px 50px;
    }

    @media screen and (min-width: 1200px) {
        width: 40%;
        padding: 15px 20px;
    }
`

export const StepsContainer = styled("div")`
    position: absolute;
    display: none;

    @media screen and (min-width: 1200px) {
        display: block;
        right: 67px;
        top: 250px;
    }
`

export const Step = styled("div")`
    display: flex;
    align-items: center;
    
`

export const StepText = styled(Typography)`
    margin-left: 12px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
`

export const Body = styled("div")`
    flex: 1;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    padding-left: 20px;
    padding-bottom: 0px;
    padding-top: 40px;
    padding-right: 36px;
    padding-bottom: 0px;

    @media screen and (min-width: 900px) {
        padding-right: 50px;
        padding-left: 50px;
    }

    @media screen and (min-width: 1200px) {
        border-top: 1px solid #d7d7d7;
        padding-right: 80px;
        padding-bottom: 30px;
    }
`

export const Footer = styled("div")`
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid #d7d7d7;
`

export const CardContainer = styled("div")`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: rgba(255,255,255,.95);
    border-radius: 4px;
    overflow: hidden;

    @media screen and (min-width: 1200px) {
        width: 78%;
        min-height: 660px;
        box-shadow: 0 2px 2px rgb(0 0 0 / 24%), 0 0 2px rgb(0 0 0 / 12%);
    }
`

export const FieldsContainer = styled("div")`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    margin-bottom: 30px;

    @media screen and (min-width: 900px) {
        flex-direction: row;    
    }

    @media screen and (min-width: 1200px) {  
        margin-bottom: 0;
    }
`

export const LocationContainer = styled("div")`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    margin-bottom: 30px;

    @media screen and (min-width: 1200px) {  
        margin-bottom: 0;
    }
`

export const AvatarContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    position: relative;

    @media screen and (min-width: 900px) {
        margin-bottom: 0;   
    }
`

export const NavButton = styled("button")`
    padding: 10px;
    color: white;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
`

export const LeftNav = styled(NavButton)<{ disabled: boolean }>`
    margin-right: auto;
    pointer-events: ${({ disabled }) => disabled ? "none" : "auto"};
    color:  ${({ disabled }) => disabled ? "transparent" : "white"} !important;
    user-select: ${({ disabled }) => disabled ? "none" : "auto"}; 
`

export const RightNav = styled(NavButton)`
    margin-left: auto;
`

export const Stages = styled("div")`
    padding: 10px;
    color: white;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
`

export const TargetLink = styled(Link)`
    text-decoration: none;
    color: #8c0032;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

export const ReactLink = styled(RouteLink)`
    text-decoration: none;
    color: #8c0032;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

export const ToggleAnswer = styled(ToggleButton)`
    .MuiToggleButton-root {
        width: 50px;
    }

    .MuiToggleButton-root.Mui-selected {
        background: #315052 !important;
    }
`

export const Question = styled("div")`
    display: flex;
    align-items: center;
    margin-top: 30px;
`

export const ErrorMessage = styled("span")`
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    text-align: left;
    margin-top: 3px;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 0;
    color: #d32f2f;
`

export const TCError = styled(ErrorMessage)`
    position: absolute;
    left: 43px;
    width: 200px;
    top: 32px;
`

export const FooterLink = styled("div")`
    width: 100%;
    max-width: 810px;
    text-align: center;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    text-shadow: 1px 1px 3px rgb(255 255 255);
    margin-bottom: 100px;
`