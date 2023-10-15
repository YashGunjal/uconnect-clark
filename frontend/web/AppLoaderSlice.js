import store from  './redux/store';

export const appLoaderKey = "AppLoader"
const { actions } = store.reducerManager.add({
    key: appLoaderKey, 
    addedReducers: {
        updateScreenDimension :(state, action) =>{

            state.screenDimension = { ...state.screenDimension, ...action.payload}
        },
        updateUser:(state, action) => {
            state.user = { ...state.user, ...action.payload}
        },
        logoutUser:(state,action) =>{
            state.user = {
                isLoggedIn:false,
                isAdmin:false,
            }
        },
        updateVerifyDialog: (state,action) =>{ 
            state.verifyDialog = action.payload
        }
    },
    initialReducerState: {
        screenDimension:{
            height:window.innerHeight,
            width:window.innerWidth,
        },
        user:{
            isLoggedIn:false,
            isAdmin:false,
            isUserFetched:false,
        },
        verifyDialog: false,
    }
});

export const { updateScreenDimension, updateUser, logoutUser, updateVerifyDialog } = actions;