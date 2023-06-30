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

import logo from "../../assets/images/logo-white.png";
import { UserOutlined, MailOutlined, MenuOutlined } from "@ant-design/icons";

import { Link } from "@gatsbyjs/reach-router";
import { useSelector } from "react-redux";

const { Header } = Layout;
const Hands2getherPrimaryHeader = () => {
    const user = useSelector((state) => state.user);


  return (
    <div>
      <Header className="site-header">
        <div className="container">
          <Row justify="space-between" align="top">
            <Col flex={1} xs={12} sm={12}>
              <div className="logo">
                <img src={logo} height={40} />
              </div>
            </Col>
            <Col flex={0} xs={0} sm={8}>
              <Space size={20} align="start">
                <Button type="link" icon={<MailOutlined />}>
                  Hands2gether@gmail.com
                </Button>

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
              </Space>
            </Col>
          </Row>
        </div>
      </Header>
      <Header className="menu-header">
        <div className="container">
          <Menu
            mode="horizontal"
            items={[
              { key: "1", label: <Link to="/">Home</Link> },
              { key: "2", label: "Categories", link: "/about" },
              { key: "3", label: "Add My Listing", link: "/contact" },
              { key: "4", label: "Advanced Search", link: "/donate" },
            ]}
            overflowedIndicator={<MenuOutlined />}
          ></Menu>
        </div>
      </Header>
    </div>
  );
};

export default Hands2getherPrimaryHeader;
