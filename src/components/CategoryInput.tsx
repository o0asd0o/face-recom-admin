import styled from "@emotion/styled";
import { Autocomplete, AutocompleteRenderInputParams, Chip, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { ProductInformation } from "types";

type Props = {
    fullWidth: boolean,
    name: string,
    label: string,
    variant?: "standard" | "outlined",
    form: FormikProps<ProductInformation>
    disabled?: boolean,
    autoComplete: string,
}

type InputParams = AutocompleteRenderInputParams;

const CategoryChip = styled(Chip)`
     .MuiChip-deleteIcon {
         height: 17px;
     }
`;

const CATEGORY_ITEMS = [
    "BEEF",
    "CHICKEN",
    "PORK",
    "SEAFOOD",
    "VEGETABLES",
    "BEVERAGES",
    "RAMEN NOODLES",
    "PIZZA",
    "BURGER",
    "FRIES",
    "DESSERT",
    "RICE MEALS",
];

const CategoryInput: React.FC<Props> = ({ form, name, disabled, ...inputProps}) => {
    return (
        <Autocomplete
            multiple
            freeSolo
            id="categoriesInput"
            options={CATEGORY_ITEMS}
            defaultValue={[]}
            onBlur={form.handleBlur}
            filterSelectedOptions
            value={form.values.categories}
            onChange={(_, v: string[]) => form.setFieldValue(name, v)}
            disabled={disabled}
            renderTags={(
                value: string[],
                getTagProps: (arg0: { index: number }) => JSX.IntrinsicAttributes
            ) => {
                return value.map((option: string, index: number) => (
                    <CategoryChip
                        key={index}
                        disabled={disabled}
                        variant="outlined"
                        label={option}
                        sx={{ height: "22px" }}
                        {...getTagProps({ index })}
                    />
                ))
            }}
            renderInput={(params: InputParams) => (
                <TextField 
                    {...params}
                    {...inputProps}
                    disabled={disabled}
                    onKeyDown={(event) => {
                        if (event.key  === "Enter"){
                            event.stopPropagation();
                            event.preventDefault();
                        }
                    }}
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    error={form.touched.categories && Boolean(form.errors.categories)}
                    helperText={form.touched.categories && form.errors.categories}
                />
            )}
        />
    );
};

export default CategoryInput;