import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {  updateScreenDimension , updateUser} from './AppLoaderSlice';
import  AuthService from "../services/AuthService";


export default function AppLoader({children}) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener("resize", updateWindowDimensions);
    }, []);

    useEffect(async () => {
      try{
        let response = await AuthService.getCurrentUser();
        console.log("fetched user", response)
        if (response.status === 200) {
          dispatch(updateUser({...response.data, isLoggedIn:true, isUserFetched:true }))
      }
      }
      catch(e){
        console.log("catching error", e)
        dispatch(updateUser({ isUserFetched:true }))
      }
    },);

    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
          if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
          }
          if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
          }
          timers[uniqueId] = setTimeout(callback, ms);
        };
      })();

    function updateWindowDimensions() {
        waitForFinalEvent(
          () => {
            dispatch(updateScreenDimension( { width:window.innerWidth, height:window.innerHeight}));
          },
          20,
          "screen-size-update"
        );
      }

    return(
    <>  
    {children}
    </>
    )
}
