import { createSlice } from "@reduxjs/toolkit";
import {auth} from "../../FirebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { db } from "../../FirebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
  roles:[],
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { setLoginData, setLoading, setError } = loginSlice.actions;


export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    // Firestore me email check karne ke liye queries.
    const usersQuery = query(collection(db, "users"), where("email", "==", userData.email));
    const adminsQuery = query(collection(db, "admins"), where("email", "==", userData.email));

    const usersSnapshot = await getDocs(usersQuery);
    const adminsSnapshot = await getDocs(adminsQuery);

    let actualRole = null;

    if (!usersSnapshot.empty) {
      actualRole = "User"; 
    } 
    if (!adminsSnapshot.empty) {
      actualRole = "admin"; 
    }

    // Role validation: Agar koi role na mile toh alert
    if (!actualRole) {
      alert("This email is not registered. Please sign up first.");
      return;
    }

    // Agar user ka role match nahi karta toh alert
    if (actualRole !== userData.roles) {
      alert(`You cannot log in as ${userData.roles}. Your registered role is ${actualRole}.`);
      return;
    }

    // Role match ho gaya, ab authentication karein
    const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;
    console.log("User logged in with UID: ", user.uid);

    alert("Login successful");

    dispatch(setLoginData(userData));

    // Sahi role hone pr navigate karein
    if (actualRole === "admin") {
      navigate("/admindashboard");
    } else if(actualRole === "User") {
      navigate("/userdashboard");
    }

  } catch (error) {
    dispatch(setError(error.message));
    alert("Login failed: " + error.message);
  }
};



export default loginSlice.reducer;