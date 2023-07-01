import React from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Space,
  Avatar,
  Typography,
  Menu,
} from "antd";

import logo from "../assets/images/logo.png";
import { UserOutlined, MailOutlined, MenuOutlined } from "@ant-design/icons";

import { Link } from "@gatsbyjs/reach-router";
import { useSelector } from "react-redux";

const { Header } = Layout;
const Hands2getherPrimaryHeader = () => {
  const user = useSelector((state) => state.user);

  return (
    <Header className="site-header">
      <div className="container">
        <Row justify="space-between" align="top">
          <Col flex={0} xs={22} sm={8} lg={4}>
            <div className="logo">
              <img src={logo} height={60} />
            </div>
          </Col>
          <Col flex={1} xs={2} sm={12} md={8} lg={12}>
            <Menu
              mode="horizontal"
              items={[
                { key: "1", label: <Link to="/">Home</Link> },
                { key: "2", label: "Categories", link: "/about" },
                { key: "3", label: "Add My Listing", link: "/contact" },
                { key: "4", label: "Advanced Search", link: "/donate" },
              ]}
              overflowedIndicator={<MenuOutlined />}
            />
          </Col>
          <Col className="user-context" flex={0} xs={0} sm={4}  md={4}  lg={8}>
            <Space align="start">
              <Link to={user.isAuth ? "/user" : "/"}>
                <Avatar
                  size={45}
                  style={{ backgroundColor: "#f5f5f5" }}
                  icon={
                    user.isAuth ? (
                      user.photoURL && <img src={user.photoURL} />
                    ) : (
                      <UserOutlined />
                    )
                  }
                />
              </Link>
              <Link to={user.isAuth ? "/user" : "/"}>
                <Typography.Text strong>
                  {user.isAuth ? user.displayName : "Guest"}
                </Typography.Text>
              </Link>
            </Space>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default Hands2getherPrimaryHeader;
