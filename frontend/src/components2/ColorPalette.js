import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const ColorPalette = props => {
  const spacing = 1
  return (
    <div id="ColorPalette">
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {props.colors.map((value) => (
            <Grid key={value} item>
              <Paper
                sx={{
                  height: 140,
                  width: 100,
                  backgroundColor: value,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
    )
}

export default ColorPalette