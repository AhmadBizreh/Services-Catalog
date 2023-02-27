import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

export default function CheckType(props) {

  //RequesterUser false
  //ProvideUser true
  // const [checked , setChecked] = React.useState(false)
  const ChangeCheckedHanler = () =>{
    // setChecked(!checked);
    // console.log("ChangeChecked");
    // console.log(checked);
    props.typeHandler();
  };
  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Do you want to be a service provider?</FormLabel> */}
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="start"
          control={<Checkbox />}
          onChange={ChangeCheckedHanler}
          label="Do you want to be a service provider?"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
}
