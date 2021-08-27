import NavBar from "./components/NavBar";
import Chart from "./Chart";
import { Grid, Paper } from "@material-ui/core";
import SubscriberList from "./components/SubscriberList";
import { useState } from "react";

const App = () => {
  const [filter, setFilter] = useState(JSON.stringify({}));
  return (
    <div>
      <Grid
        container
        direction="row-reverse"
        spacing={2}
        alignItems="baseline"
        justifyContent="center"
      >
        <Grid item xs={12} sm={4}>
          <Chart />
        </Grid>
        <Grid container direction="column" item xs={12} sm={8}>
          <Grid>
            <NavBar setFilter={setFilter} />
          </Grid>
          <Grid>
            <Paper>
              <SubscriberList filter={JSON.parse(filter)} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
