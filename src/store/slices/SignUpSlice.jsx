import { createSlice } from "@reduxjs/toolkit";
import {auth, db} from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {setDoc,doc } from "firebase/firestore"; 


const initialState = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    roles: [],
};

const SignupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.name = action.payload.name;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.phone = action.payload.phone;
            state.city = action.payload.city;
            state.roles = action.payload.roles;
        },
        resetFormData: () => initialState,
    }
});

export const { setFormData, resetFormData } = SignupSlice.actions;

export const signUpUser = (userData) => async (dispatch) => {
    try {
       const userCredentials = await createUserWithEmailAndPassword(auth,userData.email,userData.password);
       
       const user = userCredentials.user;
       console.log(user);
       console.log('User id is --> ',user.uid);
       
        dispatch(setFormData(userData));

        //Store data into Database:
        const role = Array.isArray(userData.roles) ? userData.roles[0] : userData.roles; 
        const collectionName = role === "admin" ? "admins" : "users";

        await setDoc(doc(db, collectionName, user.uid), {
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
            phone: userData.phone,
            city: userData.city,
            role: role, 
        });

        console.log(`User data stored in ${collectionName} collection successfully.`)

        alert('sign up successfull')
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    }
}

export default SignupSlice.reducer;