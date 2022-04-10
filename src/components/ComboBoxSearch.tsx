import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { ProductInformation } from "types";

type Props = {
  fullWidth: boolean,
  name: string,
  label: string,
  variant?: "standard" | "outlined",
  form: FormikProps<ProductInformation>
  disabled?: boolean,
  autoComplete: string,
  items: string[],
};


const ComboBoxSearch: React.FC<Props> = ({ form, disabled, name, items = [], ...inputProps }) => {

  console.log({ items, value: form.values.ownerEmail })
  return (
    <Autocomplete
      disablePortal
      id="combo-box-input"
      onBlur={form.handleBlur}
      defaultValue={items[0] || ""}
      options={items}
      value={form.values.ownerEmail}
      onChange={(_, v: string | null) => form.setFieldValue(name, v)}
      disabled={disabled}
      renderInput={(params) => (
        <TextField 
            {...params}
            {...inputProps}
            disabled={disabled}
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            error={form.touched.ownerEmail && Boolean(form.errors.ownerEmail)}
            helperText={form.touched.ownerEmail && form.errors.ownerEmail}
        />
      )}
    />
  );
};

export default ComboBoxSearch;