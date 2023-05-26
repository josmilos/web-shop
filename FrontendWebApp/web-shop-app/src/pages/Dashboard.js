import { redirect, Link as RouterLink } from "react-router-dom";
import {
  ContainerCardGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
} from "./styles/DashBoardStyle";
import { Grid, Typography, ButtonBase, Icon} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PageContent from "../components/PageContent";

<link rel="stylesheet" href="fonts.googleapis.com/icon?family=Material+Icons" />

const cards = [
  { id: "profile", image: "", title: "Profile", description: "Your Profile", icon: 'AccountCircle'},
  { id: "new-product", image: "", title: "New Product", description: "Add a New Product", icon: 'AccountCircleIcon' },
  { id: "new-order", image: "", title: "New Order", description: "Make a New Order", icon: 'AccountCircle' },
  { id: "order-history", image: "", title: "Order History", description: "Check Past Orders", icon: 'AccountCircleIcon' },
  { id: "verification", image: "", title: "Verification", description: "Verify New Sellers", icon: 'AccountCircleIcon' },
  { id: "pending-orders", image: "", title: "Pending Orders", description: "Orders To Be Shipped", icon: 'AccountCircleIcon' },
  { id: "all-orders", image: "", title: "All Orders", description: "Check All Created Orders", icon: 'AccountCircleIcon' },
];

const content = {
  title:'Dashboard',
  description: 'Welcome to the dashboard. Choose one of the options listed below.'
}

// FALI NEGDE key={page.id}
const DashboardPage = () => {
  return (
    <>
    <PageContent content={content}/>
    {cards.map((page) => {
        return (<ButtonBase component={RouterLink} to={page.id} key={page.id}> 
        <ContainerCardGrid maxWidth="md" >
          <Grid container spacing={4}>
            <Grid item >
              <StyledCard>
                <Icon component={page.icon}></Icon>
                <StyledCardContent>
                  <Typography gutterBottom variant="h5">
                    {page.title}
                  </Typography>
                  <Typography>{page.description}</Typography>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </ContainerCardGrid>
      </ButtonBase>)
    })}
    </>
  );
};

export default DashboardPage;
