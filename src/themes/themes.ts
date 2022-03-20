import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#810202",
        },
        secondary: {
            main: "#8c0032",
            light: "#fa5788",
        },
    },
});

export const palette = {
    Red: "#f44336",
    Pink: '#e91e63',
    Purple: '#9c27b0',
    DeepPurple: '#673ab7',
    Indigo: '#3f51b5',
    Blue: '#2196f3',
    "Light Blue": '#03a9f4',
    Cyan: "#00bcd4",
    Teal: '#009688',
    Green: '#4caf50',
    "Light Green": '#8bc34a',
    Lime: '#cddc39',
    Yellow: '#ffeb3b',
    Amber: '#ffc107',
    Orange: '#ff9800',
    "Deep Orange": '#ff5722'  
};

export { theme }