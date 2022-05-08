import styled from "@emotion/styled";
import { Grid, TextField } from "@mui/material";
import PaswordWithMask from "components/PaswordWithMask";
import { FormikProps } from "formik";
import React from "react";
import { RegistrationDetails } from "types";

type Props = {
  form: FormikProps<RegistrationDetails>;
};

const Container = styled("div")`
  flex: 1;
  padding-left: 20px;
  margin-top: 20px;
`;

const CUSTOM_PADDING = { paddingTop: "12px !important" };

const MainFields: React.FC<Props> = ({ form }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={CUSTOM_PADDING}>
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            variant="outlined"
            autoComplete="off"
            value={form.values.firstName}
            onBlur={form.handleBlur}
            onChange={(event) => {
              const { value } = event.target;
              if (value.match(/^[a-zA-Z0-9'-]*$/)) {
                form.handleChange(event);
              }
            }}
            error={form.touched.firstName && Boolean(form.errors.firstName)}
            helperText={form.touched.firstName && form.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={CUSTOM_PADDING}>
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            variant="outlined"
            autoComplete="off"
            value={form.values.lastName}
            onBlur={form.handleBlur}
            onChange={(event) => {
              const { value } = event.target;
              if (value.match(/^[a-zA-Z0-9'-]*$/)) {
                form.handleChange(event);
              }
            }}
            error={form.touched.lastName && Boolean(form.errors.lastName)}
            helperText={form.touched.lastName && form.errors.lastName}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={CUSTOM_PADDING}>
          <TextField
            fullWidth
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            autoComplete="off"
            value={form.values.email}
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            error={form.touched.email && Boolean(form.errors.email)}
            helperText={form.touched.email && form.errors.email}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={CUSTOM_PADDING}>
          <PaswordWithMask
            fullWidth
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            autoComplete="off"
            value={form.values.password}
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            error={form.touched.password && Boolean(form.errors.password)}
            helperText={form.touched.password && form.errors.password}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={CUSTOM_PADDING}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            name="address"
            label="Address"
            variant="outlined"
            autoComplete="off"
            value={form.values.address}
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            error={form.touched.address && Boolean(form.errors.address)}
            helperText={form.touched.address && form.errors.address}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={CUSTOM_PADDING}>
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            autoComplete="off"
            value={form.values.phoneNumber}
            onBlur={form.handleBlur}
            onChange={(event) => {
              const { value } = event.target;
              if (value.match(/^[0-9\s+]*$/)) {
                form.handleChange(event);
              }
            }}
            error={form.touched.phoneNumber && Boolean(form.errors.phoneNumber)}
            helperText={form.touched.phoneNumber && form.errors.phoneNumber}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainFields;
