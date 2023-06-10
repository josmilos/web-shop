import { Fragment, useState } from "react";
import {
  ContainerCardGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
} from "../ProductItemStyle";
import { Grid, Typography, ButtonBase, Icon, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ImageDecode } from "../../service/ImageConverter";
import { DecodedImage } from "../DecodedImage";

const SProductItem = ({product}) => {
  const [image, setImage] = useState("");
return (
    <Fragment>
      <ButtonBase component={RouterLink} to={`${product.productId}`}>
        <ContainerCardGrid maxWidth="md">
          <Grid container spacing={4}>
            <Grid item>
              <StyledCard>
              <DecodedImage base64String={product.image} /> 
                <StyledCardContent>
                  <Typography gutterBottom variant="h5">
                    {product.name}
                  </Typography>
                  <Typography>{product.description}</Typography>
                  <Typography>Price: {product.price}</Typography>
                  <Typography>Available: {product.quantity}</Typography>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </ContainerCardGrid>
      </ButtonBase>
    </Fragment>
)
}

export default SProductItem;