import NavBar from "./components/NavBar";
import Chart from "./Chart";
import { Grid, Paper, Box, Divider } from "@material-ui/core";
import SubscriberList from "./components/SubscriberList";
import { useState } from "react";

const App = () => {
  const [filter, setFilter] = useState(JSON.stringify({}));
  return (
    <Box sx={{ m: 2 }}>
      <Grid
        container
        direction="row-reverse"
        spacing={2}
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid item xs={12} md={12} sm={12} lg={4}>
          <Chart />
          <Divider />
        </Grid>

        <Grid container direction="column" item xs={12}  md={12} lg={8}>
          <Grid>
            <NavBar setFilter={setFilter} />
          </Grid>
          <Grid>
            <Paper>
              <Box style={{ maxHeight: "80vh", overflow: "auto" }}>
                <SubscriberList filter={JSON.parse(filter)} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
