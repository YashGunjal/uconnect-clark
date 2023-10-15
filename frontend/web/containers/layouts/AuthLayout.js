import React from "react";
// react library for routing
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import AuthFooter from "../../components/Footers/AuthFooter.js";
import AuthRoutes from "./AuthRoutes.js";

export default function AuthLayout() {
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
    document.body.classList.add("bg-default");
    
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContentRef}>
        <Switch>
          {getRoutes(AuthRoutes)}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </div>
      <AuthFooter />
    </>
  );
}

