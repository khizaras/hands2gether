import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Space,
  Table,
  Typography,
  Input,
  Select,
  DatePicker,
  Upload,
  Drawer,
} from "antd";
import React, { useEffect } from "react";
import "../assets/style/categories.less";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { UploadOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
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

      render: (record) => {
        return <Typography.Text>{record.length}</Typography.Text>;
      },
    },
    {
      title: "Action",
      render: (record) => {
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
                extra={[
                  <Button key={0} type="primary">
                    Add Category
                  </Button>,
                ]}
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

  const onFinish = (values) => {
    console.log({ values });
  };

  return (
    <Card
      title={`Edit Category ${category.name}`}
      extra={[
        <Button
          key={0}
          danger
          type="primary"
          onClick={() =>
            setState({ ...state, showEditForm: false, record: {} })
          }
        >
          Cancel
        </Button>,
      ]}
      className="edit-category-form"
    >
      <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
        <Form.Item
          label="Name"
          name={["category", "name"]}
          initialValue={category.name}
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter Name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name={["category", "description"]}
          initialValue={category.description}
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={5} placeholder="Enter Description" />
        </Form.Item>
        {category.fields.map((attributes, index) => (
          <RenderFields key={index} attributes={attributes} index={index} />
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const RenderFields = ({ attributes }) => {
  return attributes.type === "text" ? (
    <Form.Item
      label={attributes.label}
      name={["category", "fields", attributes.name, "value"]}
      initialValue={attributes.value || ""}
      rules={[
        {
          required: attributes.required || false,
          message: `Please enter ${attributes.label}`,
        },
      ]}
    >
      <Input placeholder={attributes.placeholder} />
    </Form.Item>
  ) : attributes.type === "number" ? (
    <Form.Item
      label={attributes.label}
      name={["category", "fields", attributes.name, "value"]}
      initialValue={attributes.value || ""}
      rules={[
        {
          required: attributes.required || false,
          message: `Please enter ${attributes.label}`,
        },
      ]}
    >
      <Input type="number" placeholder={attributes.placeholder} />
    </Form.Item>
  ) : attributes.type === "select" ? (
    <Form.Item
      label={attributes.label}
      name={["category", "fields", attributes.name, "value"]}
      initialValue={attributes.value || ""}
      rules={[
        {
          required: attributes.required || false,
          message: `Please enter ${attributes.label}`,
        },
      ]}
    >
      <Select
        placeholder={attributes.placeholder}
        options={attributes.options}
      />
    </Form.Item>
  ) : attributes.type === "textarea" ? (
    <Form.Item
      label={attributes.label}
      name={["category", "fields", attributes.name, "value"]}
      initialValue={attributes.value || ""}
      rules={[
        {
          required: attributes.required || false,
          message: `Please enter ${attributes.label}`,
        },
      ]}
    >
      <Input.TextArea
        rows={5}
        placeholder={attributes.placeholder}
      ></Input.TextArea>
    </Form.Item>
  ) : attributes.type === "file" ? (
    <Form.Item
      label={attributes.label}
      name={["category", "fields", attributes.name, "value"]}
      initialValue={attributes.value || ""}
      rules={[
        {
          required: attributes.required || false,
          message: `Please enter ${attributes.label}`,
        },
      ]}
    >
      <Upload>
        <Button icon={<UploadOutlined />}>{attributes.placeholder}</Button>
      </Upload>
    </Form.Item>
  ) : attributes.type === "date" ? (
    <Form.Item
      label={attributes.label}
      name={["category", "fields", attributes.name, "value"]}
      initialValue={attributes.value || ""}
      rules={[
        {
          required: attributes.required || false,
          message: `Please enter ${attributes.label}`,
        },
      ]}
    >
      <DatePicker placeholder={attributes.placeholder} />
    </Form.Item>
  ) : null;
};
