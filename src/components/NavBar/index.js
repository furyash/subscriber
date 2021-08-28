import React, { useState } from "react";
import {
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

const NavBar = (props) => {
  const [open, setOpen] = useState(null);
  const [packageText, setPackageText] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const openFilterMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setOpen(null);
  };

  const filterPackage = (event) => {
    // event.preventDefault();
    setPackageText(event.target.value);
  };

  const filterDate = (event) => {
    event.preventDefault();
    setExpiryDate(event.target.value);
  };

  const performFilter = (event) => {
    event.preventDefault();
    props.setFilter(JSON.stringify({ package: packageText, date: expiryDate }));
    setPackageText("");
    setExpiryDate("");
    closeFilterMenu();
  };
  const clearFilter = (event) => {
    event.preventDefault();
    setPackageText("");
    setExpiryDate("");
    props.setFilter(JSON.stringify({ package: packageText, date: expiryDate }));
    closeFilterMenu();
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h5">Subscribers</Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton aria-controls="filter-menu" onClick={openFilterMenu}>
          <FilterListIcon />
          <Typography variant="h6">Filter</Typography>
        </IconButton>
        <IconButton onClick={clearFilter}>
          <FilterListIcon />
          <Typography variant="h6">Clear</Typography>
        </IconButton>
        <Menu
          disableAutoFocus
          disableAutoFocusItem
          autoFocus={false}
          id="filter-menu"
          anchorEl={open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          keepMounted
          open={Boolean(open)}
          onClose={closeFilterMenu}
        >
          <MenuItem>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                Package
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={packageText}
                  id="package"
                  onChange={filterPackage}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                />
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                Expiry
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={expiryDate}
                  id="date"
                  type="date"
                  onChange={filterDate}
                />
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem>
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={performFilter}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </MenuItem>
        </Menu>
      </Toolbar>
    </div>
  );
};

export default NavBar;
