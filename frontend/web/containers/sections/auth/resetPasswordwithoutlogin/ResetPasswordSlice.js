import store from '../../../../redux/store';

export const ResetPasswordKey = "resetPassword"
const { actions } = store.reducerManager.add({
    key: ResetPasswordKey, 
    addedReducers: {
        updateFormData:(state, action) =>{
            state.formData = { ...state.formData, ...action.payload}
        },
        updateValidations: (state, action) => {
            state.validations = { ...state.validations , ...action.payload}
        }
    },
    initialReducerState: {
        formData:{
            email:"",
            password:"",
            confirmPassword:""
        },
        validations:{
            emailError:"",
            isValidating:false,
            passwordError:"",
            confirmPasswordError:"",
        }
    }
});

export const {updateFormData,updateValidations} = actions;