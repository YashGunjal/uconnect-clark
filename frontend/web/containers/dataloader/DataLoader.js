import React, { useEffect } from 'react';
import { updateDepartmentList }  from "./DataloaderSlice"
import CommonServices from "../../../services/CommonServices"
import { useDispatch ,useSelector} from 'react-redux';
import socket from '../../../services/SocketBase';
import { appLoaderKey } from '../../AppLoaderSlice';
import {  addNewPostforSubject, updateReplyByPost,addLike } from "../sections/chatwindow/PostSlice";
import { subjectskey } from '../sections/main/SubjectsSlice';

// this component is to load data which is required in whole application.
// data which is common and frequently required.
export default function DataLoader({children}) {
    
    let dispatch = useDispatch();
    const { user } = useSelector((state) => {
        return state[appLoaderKey];
      });
      const { selectedSubject } = useSelector((state) => {
        return state[subjectskey];
      });

    useEffect( () => { 
        socket.on("new:post", (data) => {
            console.log("received new post with ", data, data.data[0].id,  data.data)
            if (user.id == data.data[0].user_id) {
                
                console.log(" leave it")
            }
            else{
                console.log("updating....")
                dispatch(
                    addNewPostforSubject({ subjectId: selectedSubject, post: data.data })
                    );
                }
            })
            
            socket.on("new:comment", (data) => {
                console.log("received new comment with ", data, data.data[0].id,  data.data)
                if (user.id == data.data[0].user_id) {
                    
                    console.log(" leave it")
                }
                else{
                    console.log("updating....")
                    dispatch(updateReplyByPost({ postId:data.data[0].post_id, comment: data.data} ))
                    
                    }
            })

            socket.on("add:like", (data) => {
                console.log("add like", data)
                dispatch(addLike({ postId:data.post_id, replyId: data.id} ))
            })
            
        },[])

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
