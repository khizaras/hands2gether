import React from "react";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Layout,
  Menu,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import { LuUser, LuHome } from "react-icons/lu";
import "./index.less";
import { Link, Router } from "@gatsbyjs/reach-router";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { LuCheckCircle, LuLayoutList,LuListChecks,LuBellRing} from "react-icons/lu";
import UserAddListings from "./addListings";
import UsersListings from "./mylistings";
const { Content } = Layout;

const UserPage = () => {
  const user = useSelector((state) => state.user);

  const items = [
    {
      key: "1",
      label: <Link to="/user">Home</Link>,
      icon: <LuHome />,
    },
    {
      type: 'divider',
    },

    {
      key: "2",
      label: <Link to="/user/profile">Profile</Link>,
      icon: <LuUser />,
    },
    
    {
      key: "3",
      label: "Listings",
      icon: <LuListChecks/>,
      children: [
        {
          key: "3.1",
          label: <Link to="/user/addListings">Add Listings</Link>,          
        },
        {
          key: "3.2",
          label: <Link to="/user/myListings">My Listings</Link>,
        }
      ]
    },
    {
      key: "4",
      label: <Link to="/user/notifications">Notifications</Link>,
      icon: <LuBellRing/>,
    }

  ];
  return (
    <Content className="site-user-indexPage">
      <div className="container">
        <section className="navigation">
          <Row justify="start" align="top" gutter={[16, 16]}>
            <Col  xs={24} sm={24} md={6} lg={6} >
              <UserNavigation items={items} />
            </Col>
            <Col flex="1 1 600px"   xs={24} sm={24} md={18} lg={18}  >
              <Router>
                <OverviewSection  user={user} path="/" />
                <UserAddListings path="/addListings" />
                <UserAddListings path="/editListings/:id" />
                <UsersListings path="/myListings" />
              </Router>
            </Col>
          </Row>
        </section>
      </div>
    </Content>
  );
};

export default UserPage;

const UserNavigation = ({ items }) => {
  return (
    <Card className="navigation-card">
      <Menu
        theme="light"
        
        defaultSelectedKeys={["3"]}
        defaultOpenKeys={["3.1"]}
        inlineCollapsed={false}
        mode="inline"
        items={items}
      />
    </Card>
  );
};

const OverviewSection = ({ user }) => {
  const getTs = (ts) => {
    let date = parseInt(ts);
    return moment(date).format("LLL");
  };
  return (
    <section className="overview">
      <Card className="shadow">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space size={20}>
              <Avatar
                size={85}
                style={{ backgroundColor: "#f5f5f5" }}
                icon={
                  user.isAuth ? (
                    user.photoURL && <img src={user.photoURL} />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
              <Space direction="vertical" size={1}>
                <Typography.Title level={3} strong>
                  Hi {user.isAuth ? user.displayName : "Guest"}
                </Typography.Title>
                <Typography.Text type="secondary">
                  Welcome to User profile page
                </Typography.Text>
                <Space size={20}>
                  <Space>
                    <Typography.Text level={5}>Member Since</Typography.Text>
                    <Typography.Text level={5} strong>
                      {user.isAuth
                        ? moment(
                            getTs(user?.metadata?.createdAt) ||
                              moment().valueOf()
                          ).format("LLL")
                        : null}{" "}
                    </Typography.Text>
                  </Space>

                  <Space>
                    <Typography.Text level={5}>Status</Typography.Text>
                    <Typography.Text level={5} strong>
                      <LuCheckCircle
                        style={{
                          width: 20,
                          height: 20,
                          borderBlockColor: "green",
                        }}
                      />
                    </Typography.Text>
                  </Space>
                </Space>
              </Space>
            </Space>
          </Col>

  
          <Col span={24}>
            <Divider />
          </Col>
          <Col span={24} className="stats">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic 
                  suffix="Listings"
                  title="Listings"
                  value={0}
                  prefix={<LuLayoutList/>}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  suffix="Listings"
                  title="Listings"
                  value={0}
                  prefix={<LuLayoutList/>}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  suffix="Listings"
                  title="Listings"
                  value={0}
                  prefix={<LuLayoutList/>}
                />
              </Col>
            </Row>

          </Col>
        </Row>
      </Card>
    </section>
  );
};
