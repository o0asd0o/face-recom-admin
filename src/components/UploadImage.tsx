import styled from "@emotion/styled";
import React from "react";

type Props = {
    value: File | null | string;
    onChange: (val: File | null) => void;
    name: string;
    defaultImage?: string;
    disabled?: boolean
    style?: {
        width: number | "full";
        height: number;
    }
    imageStyle?: Record<string, string | number>
}

const UploadContainer = styled.div<{disabled: boolean, width?: number | "full", height?: number}>`
    border: 1px solid #d7d7d7;
    width: ${({ width }) => {
        if (width === "full") {
            return "100%";
        }
        return `${width || 220}px`
    }};
    height: ${({ height }) => `${ height || 220}px`};
    border: 1px solid #d7d7d7;
    cursor: ${({ disabled }) => `${disabled ? "not-allowed" : "pointer"}`};
    overflow: hidden;
`

const Image = styled("img")`
    width: 100%;
    height: auto;
`

const DefaultIamge = styled(Image)`
    width: 160px;
`

const Label = styled("label")`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const UploadImage: React.FC<Props> = ({ value, name, defaultImage, style, imageStyle = {}, disabled = false, onChange }) => {

    const handleImageChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files && event?.target?.files[0]) {
            onChange(event.target.files[0]);
        }
        // error
    }, [])

    return (
        <UploadContainer disabled={disabled} width={style?.width} height={style?.height}>
            <Label
                htmlFor={`image-${name}`}
                style={{ 
                    cursor: "pointer",
                    pointerEvents: disabled ? "none" : "auto"
                }}
            >
                {value && <Image style={{...imageStyle}} alt="Cafe Avatar" src={typeof value === "string" ? value : URL.createObjectURL(value)} />}
                {!value && <DefaultIamge style={{...imageStyle}} alt="Default Avatar" src={defaultImage || "/images/register-upload.png"} />}
                <input
                    id={`image-${name}`}
                    type="file"
                    name={name}
                    onChange={handleImageChange}
                    hidden
                />
            </Label>
        </UploadContainer>
    );
};

export default UploadImage;