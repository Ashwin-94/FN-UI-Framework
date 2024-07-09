import React, { useEffect } from "react";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const PropertyDetails: React.FC = () => {
  useEffect(() => {
    console.log("Invalid route accessed");
  }, []);

  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
  }

  return (
    <>
    Property details
    </>
  );
};

export default PropertyDetails;
