import store from '../../../../redux/store';

export const LoginKey = "Login"
const { actions } = store.reducerManager.add({
    key: LoginKey, 
    addedReducers: {
        updateLogin:(state, action) =>{
            state.login = { ...state.login, ...action.payload}
        },
        updateValidations: (state, action) => {
            state.validations = { ...state.validations , ...action.payload}
        },
        updateConfirmationModal:(state, action) => {
            state.confirmationModal = action.payload
        },
        updateSignInModetoggle:(state, action) => {
            state.signInMode = !state.signInMode
        }
    },
    initialReducerState: {
        login:{
            email:"",
            password:"",
            emailLogin:""
        },
        validations:{
            emailError:"",
            isValidating:false,
            passwordError:"",
            emailLoginError:"",
            isValidatingEmailLogin : false,
        },
        confirmationModal: false,
        signInMode:true
    }
});

export const {updateSignInModetoggle, updateLogin,updateValidations, updateConfirmationModal} = actions;