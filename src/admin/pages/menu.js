import React from 'react'
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux'
import { LuLayoutDashboard, LuInfinity }  from 'react-icons/lu'
import { Link } from '@gatsbyjs/reach-router'
const { Header, Content, Footer, Sider } = Layout;

const AdminSidebar = ({token}) => {

    const items = [
        {
            key: '1',
            label: <Link to='/admin/'><LuLayoutDashboard/> <span>Dashboard</span></Link>,
            link: '/'
        },
        {
            key: '2',
            label: <Link to='/admin/categories'><LuInfinity/> Categories</Link>,
            link: '/about'
        }
    ]


    return (
        <Sider
            collapsible
          
            breakpoint='lg'
            style={{
                background: token.purple10,
                paddingTop: 70

            }}
            color='#f60'
        >

            <Menu
            
                style={{
                    background: token.purple10,
                }}
                theme="dark" mode="vertical" defaultSelectedKeys={['1']} items={items} />
        </Sider>
    )
}

export default AdminSidebar