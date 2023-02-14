import { Grid } from "@material-ui/core";
import React from "react";

export default function GridCustom(props) {
  return (
    <Grid
      {...props}
      style={{
        display: "flex",
        alignItems: props.itemAlign || "end",
      }}
    >
      {props.children}
    </Grid>
  );
}
