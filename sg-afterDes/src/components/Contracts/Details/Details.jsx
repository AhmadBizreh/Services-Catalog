import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import Layout from "../../Layout/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
// import { APIInstance } from "../../../Services/Api";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import PauseIcon from "@mui/icons-material/Pause";
import BaseUrl from "../../URL";

// let Contract = [
//   {
//     ContractId: 0,
//     Title: "",
//     Description: "",
//     active: false,
//     RequstersName: "",
//     ProvidersName: "",
//   },
// ];

const DUMMY_CONTRACT_DETAILS = [
  {
    ContractId: 1,
    Title: "m1",
    Description:
      "Finest Fish and Vegies Contract idk saf dsf sdhgfdfgh sfgdfhg  dfghdf fghdfghgfhjj dgfjhdhgj dghjgfhj ",
    Status: "true",
    RequstersName: "Yamen",
    ProvidersName: "Ahmad",
  },
];

export default function DetailsContract() {
  const token = useSelector((state) => state.auth.id);
  const RoleName = useSelector((state) => state.auth.roleName);
  const { id } = useParams();
  const Id2Int = parseInt(id);
  const [ContractDetails, setContractsDetails] = useState([]);
  const [loading, setLoading] = React.useState(true);

  const AcceptContract = async (url) => {
    console.log(Id2Int);

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ContractId: Id2Int,
        Status: "Confirm",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload(true);
        console.log(data.massage);
        // alert(data.massage);
      });
  };

  const CancellContract = async (url) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ContractId: Id2Int,
        Status: "Cancle",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload(true);
        console.log(data.massage);
        // alert(data.massage);
      });
  };

  const FetchContractDetails = async (url) => {
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
        setContractsDetails(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    // alert(id);
    document.title = "Contract Details";
    setLoading(true);
    //API FOR geting Contract Details
    FetchContractDetails(
      `${BaseUrl}api/Contracts/showcontractwithdetaile?contractid=${id}`
    );
    setLoading(false);
  }, []);

  const AcceptContractHandle = () => {
    AcceptContract(`${BaseUrl}api/Contracts/confirm`);
  };
  const CancellContractHandle = () => {
    CancellContract(`${BaseUrl}api/Contracts/cancle`);
    // window.location.reload(true);
  };

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
                Contract Details
              </Typography>
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
            {ContractDetails.map((Contr) => (
              <>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">{Contr.title}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">{Contr.description}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Start Date</TableCell>
                  <TableCell align="center">{Contr.startDate}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">End Date</TableCell>
                  <TableCell align="center">{Contr.endDate}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Status</TableCell>
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
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">{parseFloat(Contr.price).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">
                    {parseFloat(Contr.total).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Requster Name</TableCell>
                  <TableCell align="center">{Contr.requesterName}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Provider Name</TableCell>
                  <TableCell align="center">{Contr.providerName}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* ProviderUser */}
                  {RoleName === "RequesterUser" &&
                    Contr.status === "Pending" && (
                      <>
                        <TableCell align="center">Options</TableCell>
                        <TableCell align="center">
                          {/* {Contr.Status === "Pending" && ( */}

                          <Button
                            variant="contained"
                            color="success"
                            style={{ marginRight: "5px" }}
                            component={Link}
                            onClick={AcceptContractHandle}
                          >
                            Accept the offer <DoneIcon />
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            component={Link}
                            onClick={CancellContractHandle}
                          >
                            Cancel the Contract <CancelIcon />
                          </Button>

                          {/* {Contr.Status === "pending" && (
                          <Button
                            variant="contained"
                            color="success"
                            style={{ marginRight: "5px" }}
                            component={Link}
                            onClick={AcceptContractHandle}
                          >
                            Accept the offer <DoneIcon />
                          </Button>
                        )}
                        {Contr.Status === "true" && (
                          <Button
                            variant="contained"
                            color="error"
                            component={Link}
                            onClick={CancellContractHandle}
                          >
                            Cancell the Contract <CancelIcon />
                          </Button>
                        )} */}
                        </TableCell>
                      </>
                    )}
                </TableRow>
              </>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
