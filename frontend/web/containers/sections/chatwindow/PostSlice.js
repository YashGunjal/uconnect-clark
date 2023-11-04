import store from "../../../redux/store";

export const postskey = "PostsSlice";
const { actions } = store.reducerManager.add({
  key: postskey,
  addedReducers: {
    UpdateRepliesByPost: (state, action) => {
      state.repliesByPost = { ...state.repliesByPost, ...action.payload };
    },
    updatepostsBySubjects: (state, action) => {
      state.postsBySubjects = { ...state.postsBySubjects, ...action.payload };
    },
    updatePostAndReplies: (state, action) => {
      state.postsBySubjects = {
        ...state.postsBySubjects,
        ...action.payload.post,
      };
      state.repliesByPost = { ...state.repliesByPost, ...action.payload.reply };
    },
    updateReplyByPost: (state, action) => {
      if(action.payload.postId in state.repliesByPost){

        state.repliesByPost = {
          ...state.repliesByPost,
          [action.payload.postId]: [
            ...state.repliesByPost?.[action.payload.postId],
            ...action.payload.comment,
          ],
        }
      }
        else{
          state.repliesByPost = {
            ...state.repliesByPost,
            [action.payload.postId]: [ ...action.payload.comment,
            ],

        }
      };
    },
    addNewPostforSubject: (state, action) => {
      console.log(action.payload," payload forsubject add")
        

      if(action.payload.subjectId in state.postsBySubjects){

        state.postsBySubjects = {
          ...state.postsBySubjects,
          [action.payload.subjectId]: [
            ...state.postsBySubjects?.[action.payload.subjectId],
            ...action.payload.post,
          ],
        };
      }
        else{
          state.postsBySubjects = {
            ...state.postsBySubjects,
            [action.payload.subjectId]: [ ...action.payload.post ],
          };

        }
    }
  },
  initialReducerState: {
    repliesByPost: {},
    postsBySubjects: {},
  },
});

export const {
  UpdateRepliesByPost,
  updatepostsBySubjects,
  updatePostAndReplies,
  updateReplyByPost,
  addNewPostforSubject,
} = actions;
