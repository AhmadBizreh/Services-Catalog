import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Layout from "../../Layout/Layout";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import ContactsIcon from "@mui/icons-material/Contacts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import PauseIcon from "@mui/icons-material/Pause";

import BaseUrl from "../../URL";

// let Contract = [
//   {
//     ContractId: 0,
//     Title: "",
//     Price: "",
//     active: null,
//     startDate: "",
//     endDate: "",
//   },
// ];

const DUMMY_CONTRACT = [
  {
    ContractId: 1,
    Title: "m1",
    Price: "200$",
    Status: "pending",
    startDate: "12 / 1 / 2023",
    endDate: "12 / 1 / 2024",
  },
  {
    ContractId: 2,
    Title: "m1",
    Price: "200$",
    Status: "false",
    startDate: "12 / 1 / 2023",
    endDate: "12 / 1 / 2024",
  },
  {
    ContractId: 3,
    Title: "m2",
    Price: "200$",
    Status: "true",
    startDate: "12 / 1 / 2023",
    endDate: "12 / 1 / 2024",
  },
  {
    ContractId: 4,
    Title: "m3",
    Price: "200$",
    Status: "true",
    startDate: "12 / 1 / 2023",
    endDate: "12 / 1 / 2024",
  },
];

export default function IndexContract() {
  const token = useSelector((state) => state.auth.id);
  const [Contracts, setContracts] = useState([]);
  const [loading, setLoading] = React.useState(true);

  const FetchContracts = async (url) => {
    setLoading(true);
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContracts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Contract's List";
    setLoading(true);
    FetchContracts(`${BaseUrl}api/Contracts/showcontract`);
    setLoading(false);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={7}
              style={{ backgroundColor: "#8eb4db" }}
            >
              <Typography variant="h4" style={{ textAlign: "center" }}>
                Contract's List
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              Title
            </TableCell>
            {/* <TableCell align="center" style={{ fontWeight: "bolder" }}>
              Price
            </TableCell> */}

            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              Contractee
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              Status
            </TableCell>
            {/* <TableCell align="center" style={{ fontWeight: "bolder" }}>
              startDate
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              endDate
            </TableCell>*/}
            <TableCell align="center" style={{ fontWeight: "bolder" }}>
              Details
            </TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={7}>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress style={{ width: "50px", height: "50px" }} />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {Contracts.map((Contr) => (
              <TableRow
                key={Contr.contractId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{Contr.title}</TableCell>
                <TableCell align="center">{Contr.name}</TableCell>
                {/* <TableCell align="center">{Contr.Price}</TableCell> */}
                <TableCell align="center">
                  {Contr.status === "Confirm" && (
                    <>
                      <p style={{ color: "#2e7d32" }}>
                        The Contract Has Been Approved
                      </p>
                      <CheckCircleIcon color="success" />
                    </>
                  )}
                  {Contr.status === "Cancle" && (
                    <>
                      <p style={{ color: "#d32f2f" }}>
                        The Contract Is Cancelled
                      </p>
                      <CancelIcon color="error" />
                    </>
                  )}
                  {Contr.status === "Pending" && (
                    <>
                      <p style={{ color: "#0288d1" }}>
                        The Contract Is Pending
                      </p>
                      <PauseIcon color="info" />
                    </>
                  )}
                </TableCell>
                {/* <TableCell align="center">{Contr.startDate}</TableCell>
                <TableCell align="center">{Contr.endDate}</TableCell> */}

                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="info"
                    style={{ marginRight: "5px" }}
                    component={Link}
                    to={`/Contracts/Details/${Contr.contractId}`}
                  >
                    <ContactsIcon></ContactsIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
