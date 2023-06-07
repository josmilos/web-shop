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
import { extractTokenData } from "../service/UserService/AuthService";

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
  {
    id: "profile",
    image: "",
    title: "My Profile",
    icon: "AccountCircle",
    priv: ["admin", "seller", "buyer"],
  },
  {
    id: "my-products",
    image: "",
    title: "Add New Product",
    icon: "Add",
    priv: ["seller"],
  },
  {
    id: "new-order",
    image: "",
    title: "Create New Order",
    icon: "ShoppingCart",
    priv: ["buyer"],
  },
  {
    id: "order-history",
    image: "",
    title: "Order History",
    icon: "History",
    priv: ["buyer", "seller"],
  },
  {
    id: "verification",
    image: "",
    title: "Seller Verification",
    icon: "VerifiedUser",
    priv: ["admin"],
  },
  {
    id: "pending-orders",
    image: "",
    title: "Pending Orders",
    icon: "PendingActions",
    priv: ["seller"],
  },
  {
    id: "all-orders",
    image: "",
    title: "All Orders",
    icon: "FormatListBulleted",
    priv: ["admin"],
  },
];

const contentVerified = {
  title: "Dashboard",
  description:
    "Welcome to the dashboard. Choose one of the options listed below.",
};

const contentNonVerified = {
  title: "Pending Verification",
  description:
    "Your account is not verified yet. Please wait for admin to approve your registration.",
};

const DashboardPage = () => {
  
  const token = useRouteLoaderData("root");
  let userRole = "";
  let userVerified = "";
  const userToken = extractTokenData();
  if (userToken) {
    userRole = userToken["role"];
    userVerified = userToken["verification"];
  }

  return (
    <>
      {userVerified !== "verified" ? (
        <PageContent content={contentNonVerified} />
      ) : (
        <>
          <PageContent content={contentVerified} />
          {cards.map((page) => {
            return userRole && page?.priv?.find((r) => userRole?.includes(r)) ? (
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
            ) : (
              ""
            );
          })}
        </>
      )}
      {!token && (
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          You must be logged in to see the content of this page. Please log in.
        </Typography>
      )}
    </>
  );
};


export default DashboardPage;
