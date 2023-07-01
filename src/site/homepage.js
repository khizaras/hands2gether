import React, { useEffect } from "react";
import {
  Row,
  Col,
  Space,
  Typography,
  Input,
  Radio,
  Spin,
  Button,
} from "antd";
import "antd/dist/reset.css";
import "./assets/style/index.less";

import { ImList, ImTable } from "react-icons/im";

import { useSelector } from "react-redux";
import LocationPickerPopup from "./components/locationPicker";
import {Layout} from "antd";
import banner1 from "./assets/images/h2g-banners.png";
import { RenderIcon } from "../api/categories";


const { Content } = Layout;
const Hands2getherHomepageContent = () => {
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (categories.isLoaded) {
      setState({ isCategoriesLoaded: true });
    }
  }, [categories]);
  const { geolocation } = user;

  const [state, setState] = React.useState({
    isCategoriesLoaded: false,
  });
  return (
    <section className="homepage-content">
      <section className="banner-content" >
        <div className="container">
          <Row justify="center" align="middle" gutter={[16, 16]} className="bg-img" style={{background:`url('${banner1}')`}}>
            <Col flex={1}>
              <div className="banner-text">
                  <Typography.Title level={1} style={{fontFamily:'Inkfree', fontSize:50, }}>Join your hands to help the </Typography.Title>
                  <Typography.Title level={2} style={{fontFamily:'Inkfree',fontSize:60, }}>Needy ones</Typography.Title>
                  <Button type="default" size="large">See Listings</Button>
        
              </div>

            </Col>
          
          </Row>            
        </div>
      </section>
      {state.isCategoriesLoaded ? (
        <Content className="site-home-content">
              <section className="categories-section">
            <div className="container">
              <div className="categories-list">
                {categories.data.map((item, index) => (
                  <div className="category-item" key={index}>
                    <div className="category-item-image">
                      <RenderIcon icon={item.icon} />
                    </div>
                    <div className="category-item-title">
                      <Typography.Title level={4}>{item.name}</Typography.Title>{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="search-placeholder">
            <div className="container">
              <Row justify="center" align="top" gutter={[16, 16]}>
                <Col flex={1}>
                  <Input.Search
                    size="large"
                    placeholder="Search for food, shelter, etc..."
                    enterButton
                  />
                </Col>
                <Col flex={0}>
                  <Space>
                    <Radio.Group
                      size="large"
                      defaultValue="a"
                      optionType="button"
                      buttonStyle="solid"
                      options={[
                        {
                          label: <ImList />,
                          value: "grid",
                        },
                        {
                          label: <ImTable />,
                          value: "Table",
                        },
                      ]}
                    />

                    <LocationPickerPopup address={geolocation.address} />
                  </Space>
                </Col>
              </Row>
            </div>
          </section>
      
        </Content>
      ) : (
        <Spin size="large" />
      )}
    </section>
  );
};

export default Hands2getherHomepageContent;
