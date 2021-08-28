import { Typography, Grid, Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts";
import subscriptions from "../data/subscriptions.json";


const COLORS = [
  "#005FB1",
  "#0088FE",
  "#004437",
  "#009175",
  "#7F5D14",
  "#CC9520",
  "#B20036",
  "#FF004E",
  "#450086",
  "#6D00D3",
  "#CC5D27",
  "#FF8042",
  "#4C4C4C",
];

const Chart = (props) => {
  const [subscriberData, setSubscriberData] = useState([]);
  useEffect(() => {
    let modifiedData = subscriptions.reduce((acc, val) => {
      if (acc) {
        let tempAcc = acc.find((a) => a.name === val.package);
        if (tempAcc) {
          acc = acc.map((a) => {
            if (a.name === val.package) {
              a.value += 1;
            }
            return a;
          });
          return acc;
        } else {
          acc.push({ name: val.package, value: 1 });
          return acc;
        }
      }
      return acc
    }, []);
    setSubscriberData(modifiedData)
  }, []);

  return (
    <Box sx={{ pt: 3, minWidth: "350px" }}>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Summary
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PieChart width={500} height={400}>
            <Pie
              alignmentBaseline="middle"
              dataKey="value"
              isAnimationActive={false}
              data={subscriberData}
              cx="57%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {subscriberData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="centric" verticalAlign="middle" align="center" />
          </PieChart>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Chart;
