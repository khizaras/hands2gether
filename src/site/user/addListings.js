import React from "react";
import "./addListings.less";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { LuChevronRight, LuUpload } from "react-icons/lu";
import { Link, redirectTo } from "@gatsbyjs/reach-router";
import { useSelector } from "react-redux";
import { uploadListingImage } from "../../api/files";
import { addListingsAPI } from "../../api/listings";

const UserAddListings = () => {
  return (
    <section className="add-listings">
      <div className="breadcrumb">
        <Breadcrumb
          separator={<LuChevronRight />}
          items={[
            {
              title: "Home",
            },
            {
              title: <Link to="/user">User Home</Link>,
            },
            {
              title: <Link to="/user/addListings">Add Listings</Link>,
            },
          ]}
        />
      </div>
      <Row justify="space-between" align="middle" className="title">
        <Col flex={1}>
          <div className="add-listings__header">
            <Typography.Title level={2}>Add Listings</Typography.Title>
          </div>

          <div className="add-listings__description">
            <Typography.Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, quia, quos voluptate voluptatibus
              voluptates quod quae doloribus quidem repellendus. Quisquam
              voluptatum, quibusdam, quia, quos voluptate voluptatibus
              voluptates quod quae doloribus quidem repellendus.
            </Typography.Paragraph>
          </div>
        </Col>
      </Row>
      <div className="add-listings__body">
        <ChooseCategory />
      </div>
    </section>
  );
};

export default UserAddListings;

const ChooseCategory = () => {
  const [form] = Form.useForm();
  const [state, setState] = React.useState({
    category: null,
    fields: [],
  });
  const categories = useSelector((state) => state.categories);
  const user = useSelector((state) => state.user);
  const categoriesList = categories.data.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const getCategoryFields = (id) => {
    const category = categories.data.find((category) => category._id === id);
    setState({ ...state, category: id, fields: category.fields });
  };

  const onFinish = (values) => {
    addListingsAPI({ ...values, user }).then((id) => {
      Modal.success({
        title: "Success",
        content: `Your listing has been added successfully. Your listing id is ${id}`,
      });
      redirectTo("/user/")
    });
  };

  return (
    <div className="choose-category">
      <Form form={form} layout="vertical" size="large" onFinish={onFinish}>
        <Form.Item label="Category" name="category">
          <Select
            onChange={(value) => getCategoryFields(value)}
            placeholder="Select a category"
            allowClear
            showSearch
            options={categoriesList}
          />
        </Form.Item>
        {state.fields.length > 0 && <RenderFields fields={state.fields} />}
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const RenderFields = ({ fields }) => {
  return (
    <div className="render-fields">
      <Row justify="start" align="middle" gutter={[24, 24]}>
        {fields.map((field, key) => (
          <Col
            span={
              field.name === "title" ||
              field.type === "file" ||
              field.name === "description"
                ? 24
                : 8
            }
            key={key}
          >
            <Form.Item
              key={key}
              label={field.label}
              name={field.name}
              rules={[
                {
                  required: field.required,
                  message: `Please input your ${field.label}!`,
                },
              ]}
            >
              {field.type === "text" && <Input />}
              {field.type === "number" && <Input type="number" />}
              {field.type === "email" && <Input type="email" />}
              {field.type === "time" && (
                <DatePicker.TimePicker style={{ width: "100%" }} />
              )}
              {field.type === "textarea" && <Input.TextArea />}
              {field.type === "select" && <Select options={field.options} />}
              {field.type === "date" && (
                <DatePicker style={{ width: "100%" }} />
              )}
              {field.type === "file" && (
                <Upload
                  customRequest={uploadListingImage}
                  name="avatar"
                  listType="picture-card"
                  maxCount={3}
                >
                  <Button type="ghost" icon={<LuUpload />} />
                </Upload>
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </div>
  );
};
