import React, { useEffect } from 'react'
import firebaseApp from '../firebase'
import { useSelector } from 'react-redux'
import { Col, ConfigProvider, Layout, Menu, Row, theme, } from 'antd';
import { H2GTheme } from '../constants/theme';
import logo from '../assets/images/logo-white.png'
import AdminSidebar from './pages/menu';
import { Router } from '@gatsbyjs/reach-router';
import H2gAdminDashboardPage from './pages/dashboard';
import AdminMangeCategories from './pages/manageCategories';



const { Header, Content, Footer, Sider } = Layout;

const H2GAdminPage = () => {
    const { token, custom } = theme.useToken();
    const auth = useSelector(state => state.auth);
    useEffect(() => {

    }, [auth])

    return (
        <ConfigProvider theme={{ token: H2GTheme.token }}>

            <Layout >
                <AdminSidebar token={token} />
                <Layout className="site-layout">
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
                            minHeight: '100vh',
                            overflow: 'initial',
                        }}
                    >
                        <Router>
                            <H2gAdminDashboardPage path='/' />
                            <AdminMangeCategories path='/categories' />

                        </Router>
                    </Content>

                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default H2GAdminPage