import React, { useCallback, useState } from "react";
import { TextField, TextFieldProps, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const PaswordWithMask: React.FC<TextFieldProps> = (props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleTogglePassword = useCallback((show: boolean) => {
        setShowPassword(show)
    }, [setShowPassword]);

    const EndAdornment: React.FC = () => (
        <InputAdornment position="end">
            <IconButton
                onClick={() => handleTogglePassword(!showPassword)}
                edge="end"
            >
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    )

    return (
        <TextField
            {...props}
            type={showPassword ? "text" : "password"}
            InputProps={{ endAdornment: <EndAdornment /> }}
        />
    )
};

export default PaswordWithMask;