import { Box, Paper, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../FirebaseConfig";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "admins", user.uid);
        const data = await getDoc(docRef);
        console.log(data.data());
        
        if (data.exists()) {
          setUserData(data.data());
        } else {
          console.log("No such user found!");
        }
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        User Profile
      </Typography>
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "80%",
            padding: "10px 20px",
            marginTop: "30px",
          }}
        >
          {userData ? (
            <>
              <Typography>
                <b>Username:</b> {userData.name}
              </Typography>
              <Typography>
                <b>Email:</b> {userData.email}
              </Typography>
              <Typography>
                <b>Phone Number:</b> {userData.phone || "N/A"}
              </Typography>
              <Typography>
                <b>City:</b> {userData.city || "N/A"}
              </Typography>
            </>
          ) : (
            <Typography>Loading profile data...</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;