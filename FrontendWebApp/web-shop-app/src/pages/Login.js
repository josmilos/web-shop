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
import GoogleButton from "../components/GoogleButton";
import { Form, json, redirect } from "react-router-dom";
import { extractTokenData, storeAuthToken } from "../service/UserService/AuthService";

const defaultTheme = createTheme();

const LogInPage = () => {
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
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <Form method="post">
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Typography align="center">Or</Typography>
              <GoogleButton />
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Link href="sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LogInPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    userId: 0,
    email: data.get("email"),
    password: data.get("password"),
    userType: "",
  };

  const response = await fetch("https://localhost:7108/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw json(
      { message: "Could not authenticate user." },
      { status: response["statusCode"] },
      { serverMessage: response["message"] }
    );
  }

  const resData = await response.json();
  const token = resData.token;
  console.log(resData);
  storeAuthToken(token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  const decodedToken = extractTokenData();


  return redirect("/dashboard");
}
