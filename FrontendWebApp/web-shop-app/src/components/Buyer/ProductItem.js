import { Fragment, useContext } from "react";
import {
  ContainerCardGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
} from "../ProductItemStyle";
import { Grid, Typography, ButtonBase, Icon, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CartContext from "../../store/cart-context";
import { DecodedImage } from "../DecodedImage";

const ProductItem = ({product}) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = () => {
    cartCtx.addProduct({
      productId: product.productId,
      name: product.name,
      description: product.description,
      price: product.price.toFixed(2),
      quantity: 1,
      image: product.image,
      sellerId: product.sellerId
    });
  }
  return (
    <Fragment>
        <ContainerCardGrid maxWidth="md">
          <Grid container spacing={4}>
            <Grid item>
              <StyledCard>
              
                <StyledCardContent>
                <DecodedImage base64String={product.image} /> 
                  <Typography gutterBottom variant="h5">
                    {product.name}
                  </Typography>
                  <Typography>{product.description}</Typography>
                  <Typography>Price: {product.price}</Typography>
                  <Typography>Available: {product.quantity}</Typography>
                  <Button onClick={()=> addToCartHandler()}>Add to Cart</Button>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </ContainerCardGrid>
    </Fragment>
  );
};

export default ProductItem;
