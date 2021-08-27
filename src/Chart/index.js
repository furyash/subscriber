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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Chart() {
  return (
    <Box sx={{ padding: 4, margin: 5, mt: 2 }}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Summary
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PieChart width={1000} height={400}>
            <Pie
              alignmentBaseline="middle"
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx={280}
              cy={180}
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="centric" verticalAlign="middle" align="center" />
          </PieChart>
        </Grid>
        <Grid item sx={12}></Grid>
      </Grid>
    </Box>
  );
}
