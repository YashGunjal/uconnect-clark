import React, { useState } from "react";
import { appLoaderKey } from "../../../AppLoaderSlice";
import { DataLoaderKey } from "../../dataloader/DataloaderSlice";
import { useSelector } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import StudentNavbar from "../../../components/Navbars/StudentNavbar";
import SubjectMain from "./SubjectMain";
import MainPageContent from "./MainPageContent";

function PortalMain() {
  const { user } = useSelector((state) => {
    return state[appLoaderKey];
  });
  const { departmentList } = useSelector((state) => {
    return state[DataLoaderKey];
  });

  const getRoutes = (routes) => {
    return routes.map((arr, key) => {
      const department = { id: arr[0], name: arr[1] };
      return (
        <Route
          path={"/home/" + department.name.toLowerCase()}
          render={(props) => <SubjectMain {...props} department={department} />}
          key={key}
        />
      );
    });
  };



  return (
    <React.Suspense fallback="Loading...">
      <StudentNavbar />
      <Router>
        <Switch>
          {getRoutes(Object.entries(departmentList))}
          <Route
          // from="*" to="/home"
          path={"/home"}
          render={(props) => <MainPageContent/>}
          key={"default page"}
        />
        <Redirect from="/" to="/home" />
          </Switch>
      </Router>
      
    </React.Suspense>
  );
}

export default PortalMain;
