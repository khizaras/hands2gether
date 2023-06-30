import React from "react";
import { Layout, ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "./assets/style/index.less";

import { Router } from "@gatsbyjs/reach-router";
import UserPage from "./user";
import Hands2getherPrimaryHeader from "./components/header";
import Hands2getherHomepageContent from "./homepage";


const Hands2GetherSite = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6e4abd",
          fontFamily: "Roboto, sans-serif",
        },
      }}
      prefixCls="h2g"
    >
      <Layout className="h2g-site">
        <Hands2getherPrimaryHeader />
        <Router basepath="/">
          <Hands2getherHomepageContent path="/*" />
          <UserPage path="/user" />
        </Router>
      </Layout>
    </ConfigProvider>
  );
};

export default Hands2GetherSite;
