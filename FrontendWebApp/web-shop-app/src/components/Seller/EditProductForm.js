import { ThemeProvider } from "@emotion/react";
import { UploadFileOutlined } from "@mui/icons-material";
import { Box, Button, TextField, createTheme } from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";
import { DecodedImage } from "../DecodedImage";

const defaultTheme = createTheme();

const EditProductForm = ({ product }) => {
  const [productId, setproductId] = useState(product.productId);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [image, setImage] = useState(product.image);

  const ImageEncode = (e) => {
    const files = e.target.files;
    const file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage((reader.result.substring(reader.result.indexOf(',') + 1)));
    };
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          noValidate
          sx={{
            mt: 3,
            width: "100%",
            display: "grid",
            gap: "1rem",
          }}
        >
          <DecodedImage base64String={image} /> 
          <Form method="patch">
            <TextField
              label="Product ID"
              name="productId"
              value={productId}
              onChange={(e) => e.target.value = productId}
              fullWidth
              margin="normal"
              sx={{ width: "35%" }}
            />
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
              sx={{ width: "35%" }}
            />
            <TextField
              label="Description"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={4}
              margin="normal"
              sx={{ width: "35%" }}
            />
            <TextField
              label="Price"
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              required
              fullWidth
              margin="normal"
              sx={{ width: "35%" }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              name="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              required
              fullWidth
              margin="normal"
              sx={{ width: "35%" }}
            />
            <Button
              component="label"
              variant="outlined"
              fullWidth
              startIcon={<UploadFileOutlined />}
              sx={{ marginRight: "2rem", marginTop: "1rem", width: "35%" }}
            >
              Upload Picture
              <input
                type="file"
                accept="image/*"
                id="imag"
                hidden
                onChange={(e) => ImageEncode(e)}
              />
            </Button>
            <input type="text" value={image} name="img" id="img" readOnly hidden/>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2, width: "35%" }}
            >
              Save
            </Button>
          </Form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditProductForm;
