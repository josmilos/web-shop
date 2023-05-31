import {
  redirect,
  Link as RouterLink,
  useRouteLoaderData,
} from "react-router-dom";
import {
  ContainerCardGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
} from "./styles/DashBoardStyle";
import { Grid, Typography, ButtonBase, Icon } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import PageContent from "../components/PageContent";

<link
  rel="stylesheet"
  href="fonts.googleapis.com/icon?family=Material+Icons"
/>;

const icons = {
  AccountCircle: <AccountCircleIcon />,
  Add: <AddIcon />,
  ShoppingCart: <ShoppingCartIcon />,
  History: <HistoryIcon />,
  VerifiedUser: <VerifiedUserIcon />,
  PendingActions: <PendingActionsIcon />,
  FormatListBulleted: <FormatListBulletedIcon />,
};

const cards = [
  { id: "profile", image: "", title: "My Profile", icon: "AccountCircle" },
  { id: "new-product", image: "", title: "Add New Product", icon: "Add" },
  {
    id: "new-order",
    image: "",
    title: "Create New Order",
    icon: "ShoppingCart",
  },
  { id: "order-history", image: "", title: "Order History", icon: "History" },
  {
    id: "verification",
    image: "",
    title: "Verification",
    icon: "VerifiedUser",
  },
  {
    id: "pending-orders",
    image: "",
    title: "Pending Orders",
    icon: "PendingActions",
  },
  {
    id: "all-orders",
    image: "",
    title: "All Orders",
    icon: "FormatListBulleted",
  },
];

const content = {
  title: "Dashboard",
  description:
    "Welcome to the dashboard. Choose one of the options listed below.",
};

const DashboardPage = () => {
  const token = useRouteLoaderData("root");
  return (
    <>
      <PageContent content={content} />
      {token &&
        cards.map((page) => {
          return (
            <ButtonBase component={RouterLink} to={page.id} key={page.id}>
              <ContainerCardGrid maxWidth="md">
                <Grid container spacing={4}>
                  <Grid item>
                    <StyledCard sx={{ alignContent: "center" }}>
                      {icons[page.icon]}
                      <StyledCardContent>
                        <Typography gutterBottom variant="h5">
                          {page.title}
                        </Typography>
                      </StyledCardContent>
                    </StyledCard>
                  </Grid>
                </Grid>
              </ContainerCardGrid>
            </ButtonBase>
          );
        })}
      {!token && (
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          You must be logged in to see content of this page. Please log in.
        </Typography>
      )}
    </>
  );
};

export default DashboardPage;
