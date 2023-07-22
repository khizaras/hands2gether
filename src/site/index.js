import React from "react";
import { Layout, ConfigProvider } from "antd";
import { Router } from "@gatsbyjs/reach-router";
import UserPage from "./user";
import Hands2getherPrimaryHeader from "./components/header";
import Hands2getherHomepageContent from "./homepage";
import ViewListings from "./viewListings";
import "antd/dist/reset.css";
import "./assets/style/index.less";

const Hands2GetherSite = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#39489f",
          fontFamily: "Lato, sans-serif",
        },
      }}
      prefixCls="h2g"
    >
      <Layout className="h2g-site">
        <Hands2getherPrimaryHeader />
        <Router basepath="/">
          <Hands2getherHomepageContent path="/*" />
          <ViewListings path="/listings/:id" />
          <UserPage path="/user/*" />
        </Router>
      </Layout>
    </ConfigProvider>
  );
};

export default Hands2GetherSite;
