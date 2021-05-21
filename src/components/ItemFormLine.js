import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

function ItemFormLine(props) {
    const i = props.i;
    const updateLine = props.update;

    return (
        <>
        <Grid
          direction="column"
          alignItems="center"
          spacing={5}
        >
          <TextField  required 
            key={'t'+i} 
            name="title"
            onChange={updateLine} 
            variant="filled"
            value={props.item.title}
            label="Title" type="text"/>

          <TextField required
            key={'u'+i} 
            name="units"
            onChange={updateLine} 
            variant="filled"
            value={props.item.units}
            label="Units" type="text"/>

          <TextField required
            key={'v'+i} 
            name="value"
            onChange={updateLine} 
            variant="filled"
            value={props.item.value}
            label="Value" type="number"/>
        </Grid>
      </>
    );
}

export default ItemFormLine;