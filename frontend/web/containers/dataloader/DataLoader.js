import React, { useEffect } from 'react';
import { updateDepartmentList }  from "./DataloaderSlice"
import CommonServices from "../../../services/CommonServices"
import { useDispatch } from 'react-redux';

// this component is to load data which is required in whole application.
// data which is common and frequently required.
export default function DataLoader({children}) {
    let dispatch = useDispatch();

    const fetchDepartmentList = async () => {
        let departments = await CommonServices.getDepartmentList();
        let withKeys = {}
        await departments.map(department => withKeys[department.id]= department.name)
        dispatch(updateDepartmentList(withKeys))
    }

    useEffect(async()=>{
        fetchDepartmentList();
    },[])

    return(
    <>  
    {children}
    </>
    )
}
