import React, { useEffect } from 'react'
import { Layout, ConfigProvider, theme, Button, Row, Col, Space, Avatar, Typography, Menu, Carousel, Input, Radio, Spin } from 'antd'
import 'antd/dist/reset.css';
import './assets/style/index.less'
import logo from '../assets/images/logo-white.png'
import { UserOutlined, MailOutlined, MenuOutlined } from '@ant-design/icons';
import { FaBeer } from "react-icons/fa";
import { ImList, ImTable } from "react-icons/im"
import { getLocation } from '../api/location';
import { useSelector } from 'react-redux';
import LocationPickerPopup from './components/locationPicker';
import { FaShoppingBag,FaBuyNLarge } from "react-icons/fa" 
import { getItemIcon } from '../api/categories';


const { Header, Footer, Sider, Content } = Layout
const Hands2GetherSite = (props) => {

  const user = useSelector(state => state.user);
  const categories = useSelector(state => state.categories);
  useEffect(() => {
    if (categories.isLoaded) {
      setState({ isCategoriesLoaded: true })
    }
  }, [categories])
  const { geolocation } = user;


  const [state, setState] = React.useState({
    isCategoriesLoaded: false,

  })

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#6e4abd',
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
                  <Space align='start'>
                    <Avatar size={45} style={{ backgroundColor: '#f5f5f5' }} icon={<UserOutlined />} />
                    <Typography.Text ellipsis={{ suffix: '', tooltip: 'John Doe' }} strong >John Doe</Typography.Text>
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
            }
              overflowedIndicator={<MenuOutlined />}
            >


            </Menu>
          </div>
        </Header>

        <section className='banner-content'>
          <div className='container' >
            <Carousel autoplay arrows dots className='main-carousel'>
              <div className='banner-item' >
                <img src='https://santoshyogainstitute.com/storage/2021/05/The-Noble-Act-of-Anna-Daan-Paani-DaanDonating-food-drinking-water-scaled-2560x1280.jpg' />
              </div>
              <div className='banner-item' >
                <img src="https://www.realsimple.com/thmb/IxKMxzdKaJD7o3sjU5Iv75VoH58=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/women-volunteering-at-food-bank-c4b51b89539f44b5aba6893f92308949.jpg" />
              </div>

            </Carousel>
          </div>
        </section>
        {
          state.isCategoriesLoaded ?

            <Content className='site-home-content'>
              <section className='search-placeholder'>
                <div className='container' >
                  <Row justify='center' align='top' gutter={[16, 16]} >
                    <Col flex={1}>
                      <Input.Search size='large' placeholder="Search for food, shelter, etc..." enterButton />
                    </Col>
                    <Col flex={0}>
                      <Space>
                        <Radio.Group size='large' defaultValue="a" optionType="button" buttonStyle="solid" options={[
                          {
                            label: <ImList />,
                            value: 'grid',
                          },
                          {
                            label: <ImTable />,
                            value: 'Table',
                          }]} />

                        <LocationPickerPopup address={geolocation.address} />

                      </Space>
                    </Col>
                  </Row>
                </div>

              </section>
              <section className='categories-section'>
                <div className='container' >
                  <div className='categories-list'>
                    {
                      categories.data.map((item, index)=>
                        <div className='category-item' key={index} >
                          <div className='category-item-image' >{getItemIcon(item.name)}</div>
                          <div className='category-item-title' ><Typography.Title level={4}>
                          {item.name}
                            </Typography.Title> </div>
                        </div>

                      )
                    }
                  </div>
                </div>
              </section>
            </Content>
            :
            <Spin size='large' />
        }

      </Layout>
    </ConfigProvider>
  )
}

export default Hands2GetherSite