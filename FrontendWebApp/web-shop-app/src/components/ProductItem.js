import { Fragment } from "react";
import {
  ContainerCardGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
} from "./ProductItemStyle";
import { Grid, Typography, ButtonBase, Icon, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ProductItem = (product) => {
  return (
    <Fragment>
      <ButtonBase component={RouterLink} to={"/"}>
        <ContainerCardGrid maxWidth="md">
          <Grid container spacing={4}>
            <Grid item>
              <StyledCard>
                <StyledCardMedia
                  image="https://source.unsplash.com/random"
                  title="Product Title"
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="h5">
                    {product.name}
                  </Typography>
                  <Typography>{product.description}</Typography>
                  <Typography>Price: {product.price}</Typography>
                  <Typography>Available: {product.quantity}</Typography>
                  <Button>Buy</Button>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </ContainerCardGrid>
      </ButtonBase>
    </Fragment>
  );
};

export default ProductItem;
