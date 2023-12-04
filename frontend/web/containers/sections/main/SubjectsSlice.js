import store from  '../../../redux/store';

export const subjectskey = "SubjectsSlice"
const { actions } = store.reducerManager.add({
    key: subjectskey, 
    addedReducers: {
        toogleSidePanel :(state, action) =>{

            state.sidePanelOpen =  !state.sidePanelOpen
        },
        updateSelectedCourse:(state, action) => {
            state.selectedCourse = action.payload
        },
        updateCourse:(state, action) => {
            state.courses = action.payload
        },
        updateSelectedSubject:(state, action) => {
            state.selectCourseObject= state.courses.find((course) => course.id === action.payload.course_id)
            state.selectedSubjectName = action.payload?.name || " "
            state.selectedSubject = action.payload.id
        },
        updateSubject:(state, action) => {
            state.subjects = action.payload
        },
        updateSearchText:(state, action) => {
            state.searchText = action.payload
        },
    },
    initialReducerState: {
        sidePanelOpen: true,
        selectedCourse: 1,
        selectCourseObject:{name: "MS CS"},
        courses: {},
        subjects :{},
        selectedSubject: 1,
        selectedSubjectName:"Software",
        searchText:"",
    }
});

export const { toogleSidePanel, updateCourse, updateSubject,updateSelectedSubject, updateSearchText } = actions;