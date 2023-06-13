import React from 'react'
import { Layout, ConfigProvider, theme, Button, Row, Col, Space, Avatar, Typography, Menu } from 'antd'
import 'antd/dist/reset.css';
import './assets/style/index.less'
import logo from '../assets/images/logo-white.png'
import { UserOutlined, MailOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout
const Hands2GetherSite = () => {


  return (
    <ConfigProvider theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: '#6e4abd',
        colorPrimaryBg: '#6e4abd',
        fontFamily: 'Roboto, sans-serif',
      },

    }} prefixCls='h2g' >
      <Layout className='h2g-site'> 
        <Header className='site-header'>
          <div className="container" >
            <Row justify="space-between" align="top" >
              <Col flex={1} xs={12} sm={12} >
                <div className="logo" ><img src={logo} height={40} /></div>
              </Col>
              <Col flex={0} xs={0} sm={8} >
                <Space size={20} align='start' >
                  <Button type="link" ><MailOutlined /> Hands2gether@gmail.com </Button>
                  <Space  align='start'>
                    <Avatar size={45} style={{ backgroundColor: '#f5f5f5' }} icon={<UserOutlined />} />
                    <Typography.Text ellipsis={{suffix:'', tooltip:'John Doe'}} strong >John Doe</Typography.Text>
                  </Space>
                </Space>
              </Col>
            </Row>
          </div>
        </Header>
        <Header className='menu-header'>
        <div className="container" >
          <Menu mode="horizontal" items={
            [
              { key: '1', label: 'Home', link: '/' },
              { key: '2', label: 'Categories', link: '/about' },
              { key: '3', label: 'Add My Listing', link: '/contact' },
              { key: '4', label: 'Advanced Search', link: '/donate' }]
          }>


          </Menu>
          </div>
        </Header>



      </Layout>
    </ConfigProvider>
  )
}

export default Hands2GetherSite