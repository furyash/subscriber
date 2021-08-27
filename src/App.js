import "./App.css";
import NavBar from "./components/NavBar";
import Chart from "./Chart";
import { Grid, Paper } from "@material-ui/core";
import SubscriberList from "./components/SubsciberList";

const App = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid container direction="column" item xs={8}>
          <Grid>
            <NavBar />
          </Grid>
          <Grid>
            <Paper>
              <SubscriberList />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={4} justifyContent="center">
          <Chart />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
