import store from  '../../redux/store';

export const DataLoaderKey = "DataLoader"
const { actions } = store.reducerManager.add({
    key: DataLoaderKey, 
    addedReducers: {
        updateDepartmentList: (state, action) =>{
            state.departmentList = action.payload
        },
        updateSelecedDepartment:(state, action) =>{
            state.selectedDepartment = action.payload
        }
    },
    initialReducerState: {
        departmentList : {},
        selectedDepartment:1
    }
});

export const {  updateDepartmentList, updateSelecedDepartment } = actions;