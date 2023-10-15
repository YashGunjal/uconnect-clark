import store from '../../../../redux/store';

export const RegistrationKey = "Registration"
const { actions } = store.reducerManager.add({
    key: RegistrationKey, 
    addedReducers: {
        updateRegistration:(state, action) =>{
            state.registration = { ...state.registration, ...action.payload}
        },
        updateValidations: (state, action) => {
            state.validations = { ...state.validations , ...action.payload}
        },
        updatePageStatus:(state, action) => {
            state.firstpartComplete = action.apyload
        },
    },
    initialReducerState: {
        registration:{
            firstName:"",
            lastName: "",
            email:"",
            countryCode:91,
            contactNumber:"",
            companyName:"",
            website:"",
            password:"",
            confirmPassword:"",
            encryptedCode:null,
            enteredCode:"",
        },
        validations:{
            firstNameError:"",
            lastNameError:"",
            emailError:"",
            isValidating:false,
            passwordError:"",
            ConfirmPasswordError:"",
            verificationError:""
        },
        firstPartComplete: false,
        
    }
});

export const {updateRegistration,updateValidations, updatePageStatus} = actions;