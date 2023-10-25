import store from  '../../../redux/store';

export const postskey = "PostsSlice"
const { actions } = store.reducerManager.add({
    key: postskey, 
    addedReducers: {
        UpdateRepliesByPost :(state, action) =>{

            state.repliesByPost = {...state.repliesByPost,   ...action.payload}
        },
        updatepostsBySubjects:(state, action) => {
            state.postsBySubjects = {...state.postsBySubjects,   ...action.payload}
        },
        updatePostAndReplies:(state, action) => {
            state.postsBySubjects = {...state.postsBySubjects,   ...action.payload.post}
            state.repliesByPost = {...state.repliesByPost,   ...action.payload.reply}
        },
    },
    initialReducerState: {
        repliesByPost:  {},
        postsBySubjects: {}


    }
});

export const { UpdateRepliesByPost, updatepostsBySubjects, updatePostAndReplies } = actions;