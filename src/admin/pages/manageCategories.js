import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Space,
  Table,
  Typography,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
} from "antd";
import React, { useEffect } from "react";
import "../assets/style/categories.less";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";

import { UploadOutlined } from "@ant-design/icons";
import _, { set } from "lodash";
const AdminMangeCategories = () => {
  const [state, setState] = React.useState({
    isLoaded: false,
    showEditForm: false,
    ShowAddForm: false,
    record: {},
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "Fields Length",
      dataIndex: "fields",
      key: "fields",

      render: (record, row, index) => {
        return <Typography.Text>{record.length}</Typography.Text>;
      },
    },
    {
      title: "Action",
      render: (record, row, index) => {
        return (
          <Space>
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const handleEdit = (record) => {
    setState({ ...state, showEditForm: true, record });
  };
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (categories.isLoaded) {
      setState({ isLoaded: true });
    }
  }, [categories]);

  return (
    <section className="manage-categories">
      <div className="page-header">
        <Space align="start">
          <Button
            type="default"
            shape="circle"
            size="large"
            icon={<AiOutlineArrowLeft />}
            onClick={() => window.history.back()}
          />
          <Typography.Title level={2}>Manage Categories</Typography.Title>
        </Space>
      </div>
      <div className="page-content">
        {state.showEditForm ? (
          <Row gutter={[16, 16]}>
            <Col flex={1}>
              <EditCategoryForm
                category={state.record}
                setState={setState}
                state={state}
              />
            </Col>
          </Row>
        ) : (
          <Row gutter={[16, 16]}>
            <Col flex={1}>
              <Card
                title="Categories"
                extra={[<Button type="primary">Add Category</Button>]}
              >
                <Table
                  key={1}
                  dataSource={categories.data}
                  columns={columns}
                  loading={!state.isLoaded}
                />
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </section>
  );
};

export default AdminMangeCategories;

const EditCategoryForm = ({ category, setState, state }) => {
  const [form] = Form.useForm();

  useEffect(() => {}, [category]);

  return (
    <Card
      title={`Edit Category ${category.name}`}
      extra={[
        <Button
          danger
          type="primary"
          onClick={() =>
            setState({ ...state, showEditForm: false, record: {} })
          }
        >
          Cancel
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        {category.fields.map((field, index) => {
          return (
            <Col span={24} key={index}>
              <RenderFields field={field} index={index} />
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

const RenderFields = ({ field, index }) => {
  const [fields, setFields] = React.useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (field) {
      let formFields = [];
      formFields = convertObjectToArray(field);
      setFields(formFields);
    }
  }, [field]);

  const convertObjectToArray = (obj) => {
    return Object.entries(obj).map(([name, value]) => ({
      name,
      value: value.toString(),
    }));
  };

  return (
    <Card title={field.label}>
      <Form form={form} layout="vertical">
        {fields.map((item, key) => {
          return (
            <Form.Item
              key={key}
              label={item.name}
              name={["fields", key, item.name]}
              initialValue={item.value}
            >
              {item.name === "type" ? (
                <Select
                  options={[
                    { label: "Text", value: "text" },
                    { label: "Number", value: "number" },
                    { label: "Email", value: "email" },
                    { label: "Date", value: "date" },
                    { label: "Time", value: "time" },
                    { label: "Select", value: "select" },
                    { label: "Textarea", value: "textarea" },
                    { label: "File", value: "file" },
                    { label: "Switch", value: "switch" },
                  ]}
                />
              ) : item.name === "options" ? (
                <Select
                defaultValue={field.options}
                mode="multiple"
                  options={field.options.map((option) => {
                    return { label: option.label, value: option.value };
                  })}
                />
              ) : (
                <Input />
              )}
            </Form.Item>
          );
        })}
      </Form>
    </Card>
  );
};

const categorySchema = {
  name: "Food",
  icon: "emoji-food-beverage",
  description: "Food",
  id: 1,
  fields: [
    {
      name: "title",
      placeholder: "Enter Title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      placeholder: "Enter Description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      options: [
        {
          label: "Wanted",
          value: "wanted",
        },
        {
          label: "Ready to Offer",
          value: "available",
        },
      ],
      name: "Type",
      placeholder: "Select Listings Type",
      label: "Listings Type",
      type: "select",
      required: true,
    },
    {
      options: [
        {
          label: "Veg",
          value: "veg",
        },
        {
          label: "Non-Veg",
          value: "non-veg",
        },
        {
          label: "Both",
          value: "both",
        },
      ],
      name: "foodType",
      placeholder: "Select Food Type",
      label: "Food Type",
      type: "select",
      required: true,
    },
    {
      name: "quantity",
      placeholder: "Enter Quantity",
      label: "Quantity",
      type: "number",
      required: true,
    },
    {
      name: "expiryDate",
      placeholder: "Enter Expiry Date",
      label: "Expiry Date",
      type: "date",
      required: true,
    },
    {
      name: "pickupAddress",
      placeholder: "Enter Pickup Address",
      label: "Pickup Address",
      type: "text",
      required: true,
    },
    {
      name: "pickupDate",
      placeholder: "Enter Pickup Date",
      label: "Pickup Date",
      type: "date",
      required: true,
    },
    {
      name: "pickupTime",
      placeholder: "Enter Pickup Time",
      label: "Pickup Time",
      type: "time",
      required: true,
    },
    {
      name: "pickupInstruction",
      placeholder: "Enter Pickup Instruction",
      label: "Pickup Instruction",
      type: "text",
      required: true,
    },
    {
      name: "contactPerson",
      placeholder: "Enter Contact Person",
      label: "Contact Person",
      type: "text",
      required: true,
    },
    {
      name: "contactNumber",
      placeholder: "Enter Contact Number",
      label: "Contact Number",
      type: "number",
      required: true,
    },
    {
      name: "contactEmail",
      placeholder: "Enter Contact Email",
      label: "Contact Email",
      type: "email",
      required: true,
    },
    {
      name: "foodImage",
      placeholder: "Upload Food Image",
      label: "Food Image",
      type: "file",
      required: true,
    },
    {
      name: "foodImage",
      placeholder: "Upload Food Image",
      label: "Food Image",
      type: "file",
      required: true,
    },
  ],
};
