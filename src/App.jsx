import React from "react";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import UserDashboard from "./Components/User_screens/UserDashboard";
import { Route, Routes } from "react-router-dom";
import AdminDashbaord from "./Components/admin_screens/AdminDashbaord";
import { Notifications, Room } from "@mui/icons-material";
import CreateRoom from "./Components/admin_screens/CreateRoom";
import Packages from "./Components/admin_screens/Packages";
import CreatePackages from "./Components/admin_screens/CreatePackages";
import Rooms from "./Components/admin_screens/Rooms";
import Booking from "./Components/User_screens/Booking";
import Offers from "./Components/User_screens/Offers";
import Services from "./Components/User_screens/Services";
import Profile from "./Components/admin_screens/Profile";
import PackagePayment from "./Components/User_screens/Packagepayment";
import RoomPayment from "./Components/User_screens/RoomPayment";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} >
          <Route path="profile" element={<Profile />} />
          <Route path="booking" element={<Booking />} />
          <Route path="offers" element={<Offers />} />
          <Route path="userpackages" element={<Packages />} />
          <Route path="services" element={<Services />} />
          <Route path="packagespayment" element={<PackagePayment />} />
          <Route path="roompayment" element={<RoomPayment />} />
          </Route>
        <Route path="/admindashboard" element={<AdminDashbaord />}>
          <Route path="rooms" element={<Rooms />} />
          <Route path="createroom" element={<CreateRoom />} />
          <Route path="packages" element={<Packages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="createpackages" element={<CreatePackages />} />
          <Route path="Profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
