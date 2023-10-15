import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./../assets/css/uconnect-main-theme.css"

import {appLoaderKey} from "./AppLoaderSlice"
import { useSelector } from "react-redux";
import PortalMain from "./containers/sections/main/PortalMain";
import AuthLayout from "./containers/layouts/AuthLayout";


function Home() {
  const { user } = useSelector((state) => {
		return state[appLoaderKey];
	  });

  return (
    <React.Suspense fallback="Loading...">
      <Router>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          {user && <Route  path="/">
            <PortalMain/>
          </Route> }
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default Home;