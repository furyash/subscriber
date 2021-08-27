import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  TextField,
  Grid,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

const NavBar = (props) => {
  const [open, setOpen] = useState(null);

  const openFilterMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setOpen(null);
  };

  const filterPackage = (event) => {
    if (event.key === "Enter") {
      closeFilterMenu();
    }
  };

  const filterDate = (event) => {
    if (event.key === "Enter") {
      closeFilterMenu();
    }
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h5">Subscribers</Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton aria-controls="filter-menu" onClick={openFilterMenu}>
          <FilterListIcon />
          <Typography variant="h6" sx={{ p: 5 }}>
            Filter
          </Typography>
        </IconButton>
        <Menu
          id="filter-menu"
          anchorEl={open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
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
                <TextField id="package" onKeyPress={filterPackage} />
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                Expiry
              </Grid>
              <Grid item xs={8}>
                <TextField id="date" type="date" onKeyPress={filterDate} />
              </Grid>
            </Grid>
          </MenuItem>
        </Menu>
      </Toolbar>
    </div>
  );
};

export default NavBar;
