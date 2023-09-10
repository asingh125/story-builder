import React from "react";
import {AppBar, Toolbar, Typography} from '@material-ui/core';

function NavBar(){
    return (
      <AppBar position='static' color='default' elevation={0}>
         <Toolbar>
             <Typography>Palette Prompt 🎨</Typography>
             <br/>
         </Toolbar>
      </AppBar>

    );
}
export default NavBar;