import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import GoogleButton from "../components/GoogleButton";
import { Autocomplete } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Form } from "react-router-dom";
import { json, redirect } from "react-router-dom";

const defaultTheme = createTheme();
const minDate = dayjs(new Date(1910, 1, 1));
const userType = ["Buyer", "Seller"];

const SignUp = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    const authData = {
      userId: 0,
      userName: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      address: data.get("address"),
      dateOfBirth: data.get("date"),
      userType: data.get("type"),
      image: data.get("img"),
      verification: "",
      orders: [],
    };

    const testAuthData = {
      userId: 0,
      userName: "ivica",
      email: "ivan@email.com",
      password: "sifra12345",
      firstName: "Ivan",
      lastName: "Mitric",
      address: "Dositeja Obradovica 2",
      dateOfBirth: "2023-04-10",
      userType: "buyer",
      image: "dfa",
      verification: "",
      orders: [],
    }
    console.log("Problem")

    const response = await fetch("https://localhost:7108/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testAuthData),
    });
    console.log(response);

    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

  return redirect('/');
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            noValidate
            sx={{ mt: 3 }}
          >
            <Form method="post" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    id="date"
                    name="date"
                    minDate={minDate}
                    label="Date of Birth"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-confirm"
                  label="Repeat Password"
                  type="password"
                  id="password-confirm"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={userType}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="User Type" name="type"/>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ marginRight: "2rem" }}
                >
                  Upload Picture
                  <input type="file" accept="image/*" id="img" name="img" hidden />
                </Button>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
              
            </Button>
            </Form>
            <Typography align="center">Or</Typography>
            <GoogleButton />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="log-in" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

