import React, { useEffect } from "react";
import { Router } from "@gatsbyjs/reach-router";
import { useDispatch } from "react-redux";
import "antd/dist/reset.css";
import H2GLoginPage from "./login";
import H2GAdminPage from "./admin";
import Hands2GetherSite from "./site";
import { useSelector } from "react-redux";
import { getCategories } from "./api/categories";
import { updateCategories } from "./store/reducers/categories";

import { getLocation } from "./api/location";
import { updateAuth, updateGeolocation } from "./store/reducers/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getListingsAPI } from "./api/listings";
import { updateListings } from "./store/reducers/listings";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getCategories().then((categories) =>
      dispatch(updateCategories(categories))
    );
    getLocation().then((location) => dispatch(updateGeolocation(location)));
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        loginSuccess({ user, type: "normal" });
      }
    });
    getListingsAPI().then((listings) => {
      dispatch(updateListings(listings));
    });
  }, []);

  const loginSuccess = ({ user, type }) => {
    dispatch(updateAuth({ isAuth: true, ...user, type }));
  };

  return (
    <Router basepath="/">
      <Hands2GetherSite path="/*" />
      <H2GLoginPage path="/login/*" />
      <H2GAdminPage path="/admin/*" />
    </Router>
  );
};

export default App;
