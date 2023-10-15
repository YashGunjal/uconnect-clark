import React from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { appLoaderKey } from "../../../AppLoaderSlice";
import { useSelector } from "react-redux";
import AuthLayout from "../../layouts/AuthLayout";
import Loading from "../../../components/loading/Loading"

export default function Authentication({ children }) {
  const { user } = useSelector((state) => {
    return state[appLoaderKey];
  });

  if (user.isUserFetched === false){
    return(
      <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
        }}
      >
      <Loading color="black"/>
      </div>
    )
  }

  return (
    <>
      {user.isLoggedIn == false ? (
        <React.Suspense fallback="Loading...">
          <Router>
            <Switch>
              <Route
                path="/auth"
                render={(props) => <AuthLayout {...props} />}
              />

              <Redirect from="/" to="/auth/login/" />
            </Switch>
          </Router>
        </React.Suspense>
      ) : (
         <>{children}</> 
      )}
    </>
  );
}
