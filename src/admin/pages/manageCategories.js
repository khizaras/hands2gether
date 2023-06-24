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

  const convertObjectToArray = (obj) => {
    return Object.entries(obj).map(([name, value]) => ({
      name,
      value: value.toString(),
    }));
  };

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
      <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name={["category", "name"]}
              initialValue={category.name}
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="stretch">
          {category.fields.map((attributes, index) => {
            return (
              <Col span={24} key={index}>
                <RenderFields attributes={attributes} index={index} />
              </Col>
            );
          })}
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

const RenderFields = ({ attributes }) => {
  return attributes.type === "text" ? (
    <Row gutter={[16, 16]} align="middle" justify="space-around">
      <Col span={20}>
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
      </Col>
      <Col span={4}>
        <ActionButtons attributes={attributes} />
      </Col>
    </Row>
  ) : attributes.type === "number" ? (
    <Row gutter={[16, 16]} align="middle" justify="space-around">
      <Col span={20}>
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
      </Col>
      <Col span={4}>
        <ActionButtons attributes={attributes} />
      </Col>
    </Row>
  ) : attributes.type === "select" ? (
    <Row gutter={[16, 16]} align="middle" justify="space-around">
      <Col span={20}>
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
      </Col>
      <Col span={4}>
        <ActionButtons attributes={attributes} />
      </Col>
    </Row>
  ) : attributes.type === "textarea" ? (
    <Row gutter={[16, 16]} align="middle" justify="space-around">
      <Col span={20}>
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
      </Col>
      <Col span={4}>
        <ActionButtons attributes={attributes} />
      </Col>
    </Row>
  ) : attributes.type === "file" ? (
    <Row gutter={[16, 16]} align="middle" justify="space-around">
      <Col span={20}>
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
      </Col>
      <Col span={4}>
        <ActionButtons attributes={attributes} />
      </Col>
    </Row>
  ) : attributes.type === "date" ? (
    <Row gutter={[16, 16]} align="middle" justify="space-around">
      <Col span={20}>
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
      </Col>
      <Col span={4}>
        <ActionButtons attributes={attributes} />
      </Col>
    </Row>
  ) : null;
};

const ActionButtons = ({ attributes }) => {
  const [show, setShow] = React.useState(false);
  const showEditField = () => {
    setShow(true);
  };
  return (
    <Space>
      <Button
        icon={<EditOutlined />}
        type="ghost"
        shape="round"
        onClick={() => showEditField(attributes)}
      />
      <Button
        icon={<CloseOutlined />}
        type="ghost"
        shape="round"
        danger
        onClick={() => null}
      />
      <Drawer
        title={`Edit ${attributes.label}`}
        placement="right"
        closable={true}
        onClose={() => setShow(false)}
        open={show}
        width={500}
      >
        <Form layout="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Label"
                name="label"
                initialValue={attributes.label}
                rules={[{ required: true, message: "Please enter label" }]}
              >
                <Input placeholder="Enter Label" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                initialValue={attributes.name}
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </Space>
  );
};
