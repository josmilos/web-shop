import { Link as RouterLink } from "react-router-dom";
import React, { Fragment } from "react";

import {
  Typography,
  Button,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Box,
  ButtonBase,
  Stack,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { styled } from "@mui/material/styles";
import { Form, useRouteLoaderData } from "react-router-dom";

const DivContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 0, 6),
}));

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <Fragment>
      <header>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <ButtonBase component={RouterLink} to={"/"}>
              <ShoppingBagOutlinedIcon />
              <Typography variant="h6">Web Shop</Typography>
            </ButtonBase>

            <Button
              variant="text"
              sx={{ my: 2, color: "white", display: "block", flex: 1 }}
              component={RouterLink}
              to={"dashboard"}
            >
              Dashboard
            </Button>
            {!token && (
              <Button color="inherit" component={RouterLink} to={"log-in"}>
                Login
              </Button>
            )}
            {token && (
              <Form action="/logout" method="post">
                <Button type="submit" style={{ color: "white" }}>Logout</Button>
              </Form>
            )}
          </Toolbar>
        </AppBar>
      </header>
    </Fragment>
  );
}

export default MainNavigation;

/*
<header>
      <Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <ShoppingBagOutlinedIcon />
            <Typography variant="h6">Web Shop</Typography>
          </Toolbar>
        </AppBar>
        <main>
          <DivContainer>
            <Container maxWidth="sm">
              <Typography
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Web Shop
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Welcome to the Web Shop!
              </Typography>
              <div>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Click me
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </DivContainer>
        </main>
      </Fragment>
    </header>
*/

/*
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;*/
