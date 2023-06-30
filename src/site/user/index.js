import React from "react";
import { Card, Col, Layout, Menu, Row, Typography } from "antd";
import { LuUser, LuHome } from "react-icons/lu";
import "./index.less";
import { Link } from "@gatsbyjs/reach-router";
const { Content } = Layout;

const UserPage = () => {
  const items = [
    {
      key: "1",
      label: <Link to="/user">Home</Link>,
      icon: <LuHome />,
    },
   
    {
      key: "2",
      label: <Link to="/user/profile">Profile</Link>,
      icon: <LuUser />,
    },
  ];
  return (
    <Content className="site-user-indexPage">
      <div className="container">
        <section className="navigation">
          <Row justify="start" align="top" gutter={[16, 16]}>
            <Col flex="0 1 256px">
              <UserNavigation items={items} />
            </Col>
            <Col flex="1 1 600px">
              <OverviewSection />
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
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </Card>
  );
};

const OverviewSection = () => {
  return (
    <section className="overview">
      <Card title="Overview">
        <Row gutter={[16, 16]}>
          <Col flex={1}>
            <Typography.Title level={4}>Profile</Typography.Title>
            <Typography.Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, quia, voluptates voluptate quod quos
              voluptatibus quas doloribus quidem voluptas. Quisquam voluptatum,
              </Typography.Paragraph>
          </Col>
        </Row>
      </Card>

    </section>
  )
}
