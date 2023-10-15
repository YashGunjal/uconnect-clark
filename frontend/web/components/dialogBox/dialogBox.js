{/*  // Example usage of dialog box
<Button
  onClick={() => {
      setshow(true)
      history.push("/dashboard/requirements/popup/:re1234")

  }} >Click</Button>
<DialogBox route={"/dashboard/requirements/popup/:reqiurementid"} show={show} onClose ={() => setshow(false)}>
  { "Dialog content" }
    // onReturn can be passed if you want it to route to specific path when the popup is closed.
</DialogBox> */}


import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import DialogContent from "./DialogContent.js";

export default function DialogBox (props) {
  return (
      <Switch>
        <Route path={props.route}>
          <DialogContent {...props} />
        </Route>
      </Switch>
  );
};




