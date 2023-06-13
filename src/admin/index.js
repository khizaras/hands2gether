import React, { useEffect } from 'react'
import firebaseApp from '../firebase'
import { useSelector } from 'react-redux'
import { Col, ConfigProvider, Layout, Menu, Row, theme, } from 'antd';
import { H2GTheme } from '../constants/theme';
import logo from '../assets/images/logo-white.png'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const items = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));
const H2GAdminPage = () => {
    const { token, custom } = theme.useToken();
    console.log({ token, custom });
    const auth = useSelector(state => state.auth);
    useEffect(() => {

    }, [auth])

    return (
        <ConfigProvider theme={{ token: H2GTheme.token }}>

            <Layout >
                <Sider
                    collapsible
                    style={{
                        background: token.purple10,
                        paddingTop: 70

                    }}
                >

                    <Menu
                        style={{
                            background: token.purple10,
                        }}
                        theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
                </Sider>
                <Layout
                    className="site-layout"

                >
                    <Header
                        style={{
                            padding: '0 10px',
                            background: token.purple10,
                        }}
                    >
                        <Row align='middle' justify='space-around'>
                            <Col flex={1}>
                                <div className="logo">
                                    <img src={logo} alt="logo" height={50} />
                                </div>
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                            overflow: 'initial',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                textAlign: 'center',
                                background: "#fff",
                            }}
                        >
                            <p>long content</p>
                            {
                                // indicates very long content
                                Array.from(
                                    {
                                        length: 100,
                                    },
                                    (_, index) => (
                                        <React.Fragment key={index}>
                                            {index % 20 === 0 && index ? 'more' : '...'}
                                            <br />
                                        </React.Fragment>
                                    ),
                                )
                            }
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default H2GAdminPage