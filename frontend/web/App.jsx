import React, {useState, useEffect} from 'react';
import Home from './Home.jsx';
import store from './redux/store'
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import AppLoader from './AppLoader.js';
import Loading from "../web/components/loading/Loading"
import Authentication from "./containers/sections/auth/Authentication"
import DataLoader from "./containers/dataloader/DataLoader"
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function App() {
    const [configLoaded, setConfigLoaded] = useState(false);
    useEffect(() => {
        const request = new XMLHttpRequest();
        request.onload = (elements) => {
            window.GLOBAL_WEB_CONFIG = JSON.parse(request.response);
            setConfigLoaded(true);
        };
        const date = new Date();
        const version = (date.getTime()/10000) | 0; // Change version every 10 seconds
        request.open("get", "config.web.json?v="+version, true); // version to avoid caching
        request.send();
    }, []);
    return (
      <>
        {configLoaded? 
            (
                <Provider store={store}>
                    <AppLoader >
                    <ReactNotifications />
                        <Authentication>
                          <DataLoader> {/*app wide data */}
                            <Home />
                          </DataLoader>
                        </Authentication>
                    </AppLoader >
                </Provider>
            ) : 
            (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                <Loading />
                </div>
            )}
      </>
    );

}

export default hot(App);