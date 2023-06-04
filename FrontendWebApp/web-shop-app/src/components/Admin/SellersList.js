import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import SellerItem from "./SellerItem";
import { Table, TableHead, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

const SellersList = () => {
  const sellers = useLoaderData();
  return (
    <Fragment>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Seller ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
      </Table>
      </TableContainer>
      {sellers.map((seller) => (
        <SellerItem seller={seller} key={seller.userId}></SellerItem>
      ))}
    </Fragment>
  );
};

export default SellersList;
