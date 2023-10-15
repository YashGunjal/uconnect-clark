import store from  '../../redux/store';

export const DataLoaderKey = "DataLoader"
const { actions } = store.reducerManager.add({
    key: DataLoaderKey, 
    addedReducers: {
        updateDepartmentList: (state, action) =>{
            state.departmentList = action.payload
        } 
    },
    initialReducerState: {
        departmentList : {}
    }
});

export const {  updateDepartmentList } = actions;