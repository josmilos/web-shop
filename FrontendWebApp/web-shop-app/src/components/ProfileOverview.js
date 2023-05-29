import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const defaultTheme = createTheme();

const ProfileOverview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    firstName: "John",
    lastName: "Doe",
    address: "123 Street, City",
    dateOfBirth: "1990-01-01",
    password: "********",
    userType: "Regular",
    image: "",
    verificationStatus: "Verified",
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
            component="form"
            noValidate
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
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
            <TextField
              label="Date of Birth"
              value={formData.dateOfBirth}
              disabled={!isEditing}
              fullWidth
              name="dateOfBirth"
              onChange={handleChange}
            />
            <TextField
              label="Password"
              value={formData.password}
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
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  fullWidth
                >
                  Upload Picture
                  <input
                    type="file"
                    accept="image/*"
                    id="img"
                    name="img"
                    hidden
                  />
                </Button>
                <Button variant="contained" onClick={handleSave} fullWidth>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleEdit} fullWidth>
                Edit
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProfileOverview;
