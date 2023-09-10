import React, { useState } from "react";
import {Button, Paper} from '@material-ui/core';
import ColorPalette from "./ColorPalette";
import { Typography } from "@mui/material";

const GuessView = props => {
    const [prompt, setPrompt] = useState("")

    const handleChangeComplete = (color) => {
        setSelectedColor(color)
        setRefresher(true)
    }

    return (
      <div id="GuessView">
        This is Here
        <Typography>This is the Guess Page!</Typography>
        <ColorPalette colors={props.colors}/>
        <Button>Submit guess</Button>

      </div>
    )
}

export default GuessView