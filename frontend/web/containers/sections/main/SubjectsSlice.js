import store from  '../../../redux/store';

export const subjectskey = "SubjectsSlice"
const { actions } = store.reducerManager.add({
    key: subjectskey, 
    addedReducers: {
        toogleSidePanel :(state, action) =>{

            state.sidePanelOpen =  !state.sidePanelOpen
        },
        updateCourse:(state, action) => {
            state.selectedCourse = action.payload
        },
        updateSubject:(state, action) => {
            state.selectedSubject = action.payload
        },
    },
    initialReducerState: {
        sidePanelOpen: true,
        selectedCourse: 1,
        selectedSubject: 1,

    }
});

export const { toogleSidePanel, updateCourse, updateSubject } = actions;