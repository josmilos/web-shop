import React, { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ImageEncode } from "../service/ImageConverter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DecodedImage } from "./DecodedImage";

const defaultTheme = createTheme();

const ProfileOverview = () => {
  const user = useLoaderData();
  const [image, setImage] = useState(user.image);
  const [date, setDate] = useState(user.dateOfBirth);

  const ImageEncode = (e) => {
    const files = e.target.files;
    const file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage((reader.result.substring(reader.result.indexOf(',') + 1)));
    };
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: user.userId,
    username: user.userName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    dateOfBirth: user.dateOfBirth,
    password: user.password,
    userType: user.userType,
    image: user.image,
    verificationStatus: user.verification,
  });


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Perform save logic here
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            noValidate
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
           <DecodedImage base64String={user.image} /> 
            <Form method="patch">
            <TextField
              label="User ID"
              value={formData.userId}
              disabled
              fullWidth
            />
            <TextField
              label="Username"
              value={formData.username}
              disabled
              fullWidth
            />
            <TextField
              label="Email Address"
              value={formData.email}
              disabled
              fullWidth
            />
            <TextField
              label="First Name"
              value={formData.firstName}
              disabled={!isEditing}
              fullWidth
              name="firstName"
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              value={formData.lastName}
              disabled={!isEditing}
              fullWidth
              name="lastName"
              onChange={handleChange}
            />
            <TextField
              label="Address"
              value={formData.address}
              disabled={!isEditing}
              fullWidth
              name="address"
              onChange={handleChange}
            />
            <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <input
                          type="date"
                          name="date"
                          disabled={!isEditing}
                          value={date.slice(0, 10)}
                          onChange={(e) => setDate(e.target.value)}
                        ></input>
                      </LocalizationProvider>
                    </Grid>
            <TextField
              label="Password"
              value={""}
              disabled={!isEditing}
              fullWidth
              name="password"
              type="password"
              onChange={handleChange}
            />
            <TextField
              label="Type of User"
              value={formData.userType}
              disabled
              fullWidth
            />
            <TextField
              label="Verification Status"
              value={formData.verificationStatus}
              disabled
              fullWidth
            />

            {isEditing ? (
              <>
                <Grid item xs={12}>
                      
                      <input
                        type="file"
                        accept="image/*"
                        id="imag"
                        style={{ display: "none" }}
                        onChange={(e) => ImageEncode(e)}
                      />
                      <label htmlFor="imag">
                        <Button
                          component="span"
                          variant="outlined"
                          startIcon={<UploadFileIcon />}
                          sx={{ marginRight: "2rem" }}
                        >
                          Upload Picture
                        </Button>
                      </label>
                       
                    </Grid>
                <Button variant="contained" type="submit" fullWidth>
                  Save
                </Button>
                
              </>
              
            ) : (
              <Button variant="contained" onClick={handleEdit} fullWidth>
                Edit
              </Button>
            )}
            <input type="text" value={image} name="img" id="img" readOnly hidden/>
            </Form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProfileOverview;
