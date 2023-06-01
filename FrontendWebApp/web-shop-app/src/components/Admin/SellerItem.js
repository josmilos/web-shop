import React from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";

const SellerItem = ({ seller }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seller ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          {seller ? (
            <TableBody>
              <TableRow key={seller.userId}>
                <TableCell>{seller.userId}</TableCell>
                <TableCell>{seller.userName}</TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>{seller.firstName}</TableCell>
                <TableCell>{seller.verification}</TableCell>
                <TableCell>
                  <Button disabled={seller.verification === "verified" || seller.verification === "denied"}>
                    Verify
                  </Button>
                  <Button disabled={seller.verification === "verified" || seller.verification === "denied"}>
                    Deny
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            ""
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default SellerItem;
