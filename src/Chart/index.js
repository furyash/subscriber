import { Typography, Grid, Box } from "@material-ui/core";
import React from "react";
import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts";

const data = [
  { name: "Plan 1", value: 2400 },
  { name: "Plan 2", value: 4567 },
  { name: "Plan 3", value: 1398 },
  { name: "Plan 4", value: 9800 },
  { name: "Plan 5", value: 3908 },
  { name: "Plan 6", value: 4800 },
  { name: "Plan 7", value: 2400 },
  { name: "Plan 8", value: 4567 },
  { name: "Plan 9", value: 1398 },
  { name: "Plan 10", value: 9800 },
  { name: "Plan 11", value: 3908 },
  { name: "Plan 12", value: 4800 },
  { name: "Plan Unlimited", value: 4800 },
];

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

export default function Chart() {
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
              data={data}
              cx="57%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
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
}
