import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import usersJson from "../../data/users.json";
import subscriberJson from "../../data/subscriptions.json";
import { useEffect, useState } from "react";

let detailId = null;

const SubscriberList = (props) => {
  const [users, setUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [sorterId, setSorterId] = useState("");
  const [sorterDirection, setSorterDirection] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [sorter, setSorter] = useState({
    id: "",
    direction: "",
  });

  const closeDetail = (event) => {
    event.preventDefault();
    setShowDetail(false);
  };

  const detailBox = (id) => {
    let subscription = tableData.find((data) => data.id === id);
    if (!subscription) {
      return (
        <Paper
          elevation={10}
          style={{
            padding: "20px",
            paddingTop: "30px",
            paddingBottom: "30px",
            margin: "10px",
          }}
        >
          <Grid container justify="space-between" direction="row">
            <Grid item xs={1}>
              <IconButton
                onClick={closeDetail}
                color="secondary"
                aria-label="close detail view"
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10} alignContent="center">
              <Typography variant="h5"> No data found</Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    }
    let user = users.find((usr) => usr.id === subscription.user_id);
    let columns = [
      { title: "Id", value: subscription.id },
      { title: "Plan", value: subscription.package },
      { title: "Expires On", value: subscription.expiry },
      {
        title: "Full Name",
        value: user
          ? user.first_name + " " + user.middle_name + " " + user.last_name
          : "User not found",
      },
      { title: "Username", value: user ? user.username : "User not found" },
      { title: "Email", value: user ? user.email : "User not found" },
      {
        title: "Active",
        value: user ? (user.active === "0" ? "No" : "Yes") : "User not found",
      },
      { title: "Address", value: user ? user.address : "User not found" },
      { title: "Country", value: user ? user.country : "User not found" },
      { title: "Join Date", value: user ? user.join_date : "User not found" },
    ];

    return (
      <Paper
        elevation={10}
        style={{
          padding: "20px",
          margin: "10px",
        }}
      >
        <Grid container direction="column">
          <Grid item container justify="space-between">
            <Grid item xs={1}>
              <IconButton
                color="secondary"
                aria-label="close detail view"
                onClick={closeDetail}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10} alignContent="center">
              <Typography variant="h5" align="center">
                Detail View
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {columns.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell
                        style={{
                          backgroundColor: "#d9d9d9",
                          width: "35%",
                          fontWeight: "bold",
                          border: "2px solid rgba(0, 0, 0, 0.9)",
                        }}
                      >
                        {data.title}
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid rgba(0, 0, 0, 0.9)" }}
                      >
                        {data.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const headCells = [
    { id: "id", numeric: false, disablePadding: true, label: "ID" },
    { id: "name", numeric: false, disablePadding: true, label: "Name" },
    { id: "package", numeric: false, disablePadding: true, label: "Package" },
    { id: "expiry", numeric: false, disablePadding: true, label: "Expires On" },
  ];

  // useEffect used to load two json data into two states
  // As the data is loaded into the state using useEffect, data is loaded asynchronously
  useEffect(() => {
    setUsers(usersJson);
    setSubscribers(subscriberJson);
  }, []);

  // Main useEffect, used to combine users and subscriber's details along with filtering them
  useEffect(() => {
    if (users.length && subscribers.length) {
      let tempTableData = subscribers.map((subscriber, index) => {
        let validUser = users.find(
          (user) => user.id.toString() === subscriber.user_id.toString()
        );
        return {
          id: subscriber.id,
          name: validUser
            ? validUser.first_name + " " + validUser.last_name
            : "User not found",
          package: subscriber.package,
          user_id: validUser ? validUser.id : null,
          expiry: subscriber.expires_on,
        };
      });
      if (props.filter.date || props.filter.package) {
        tempTableData = tempTableData.filter((data) =>
          data.package.toLowerCase().includes(props.filter.package.toLowerCase())
        );
        tempTableData = tempTableData.filter((data) =>
          data.expiry.includes(props.filter.date)
        );
      }
      setTableData(tempTableData);
    }
  }, [users, subscribers, props.filter]);

  // UseEffect to sort the tableData
  useEffect(() => {
    let tempTableData = tableData;
    if (tempTableData && tempTableData.length) {
      if (sorter.direction === "asc") {
        tempTableData.sort((a, b) =>
          a[sorterId] && b[sorterId]
            ? sorter.id === "id"
              ? parseInt(a[sorterId]) - parseInt(b[sorterId])
              : a[sorterId].toString().toLowerCase() >
                b[sorterId].toString().toLowerCase()
              ? 1
              : -1
            : 1
        );
      } else {
        tempTableData.sort((a, b) =>
          a[sorterId] && b[sorterId]
            ? sorterId === "id"
              ? parseInt(b[sorterId]) - parseInt(a[sorterId])
              : a[sorterId].toString().toLowerCase() <
                b[sorterId].toString().toLowerCase()
              ? 1
              : -1
            : 1
        );
      }
    }
    setTableData(tempTableData);
    setSorter({ id: sorterId, direction: sorterDirection });
  }, [sorterId, sorterDirection]);

  const createSortHandler = (id) => {
    let tempSorter = sorter;
    if (tempSorter.id === id) {
      if (tempSorter.direction === "asc") {
        tempSorter.direction = "desc";
      } else {
        tempSorter.direction = "asc";
      }
    } else {
      tempSorter["id"] = id;
      tempSorter["direction"] = "desc";
    }
    setSorterId(tempSorter.id);
    setSorterDirection(tempSorter.direction);
  };

  const onNameClicked = (event, id) => {
    event.preventDefault();
    detailId = id;
    setShowDetail(true);
  };

  if (showDetail) {
    return detailBox(detailId);
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((headCell, index) => {
              return (
                <TableCell
                  key={index}
                  sortDirection={
                    sorter.id === headCell.id ? sorter.direction : false
                  }
                >
                  <TableSortLabel
                    active={sorter.id === headCell.id}
                    direction={
                      sorter.id === headCell.id ? sorter.direction : "asc"
                    }
                    onClick={() => createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((data, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{data.id}</TableCell>
                <TableCell>
                  <span
                    onClick={(e, id) => onNameClicked(e, data.id)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    {data.name}
                  </span>
                </TableCell>
                <TableCell>{data.package}</TableCell>
                <TableCell>{data.expiry}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriberList;
