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
  Tabs,
  Drawer,
} from "antd";
import Editor from "@monaco-editor/react";
import React, { useEffect } from "react";
import "../assets/style/categories.less";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { useRef } from "react";
import {
  createCategoryApi,
  getCategories,
  updateCategoryApi,
} from "../../api/categories";
import { updateCategories } from "../../store/reducers/categories";

const AdminMangeCategories = () => {
  const dispatch = useDispatch();
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

  const addCategory = (values) => {
    createCategoryApi(values.category).then(() => {
      getCategories().then((categories) => {
        dispatch(updateCategories(categories));
      });
    });
  };

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
                  <Button
                    key={0}
                    type="primary"
                    onClick={() => setState({ ...state, ShowAddForm: true })}
                  >
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
      <Drawer
        title="Add Category"
        placement="right"
        closable={true}
        onClose={() => setState({ ...state, ShowAddForm: false })}
        open={state.ShowAddForm}
        width={500}
      >
        <Form layout="vertical" size="middle" onFinish={addCategory}>
          <Form.Item
            label="Name"
            name={["category", "name"]}
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name={["category", "description"]}
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={5} placeholder="Enter Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </section>
  );
};

export default AdminMangeCategories;

const EditCategoryForm = ({ category, setState, state }) => {
  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const [fields, setFields] = React.useState(category.fields);
  const [activeKey, setActiveKey] = React.useState("1");
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const onFinish = (values) => {
    const data = {
      _id: category._id,
      ...values.category,
      fields: JSON.parse(editorRef.current.getValue()),
    };

    updateCategoryApi(data).then((res) => {
      console.log({ data, res });
    });
  };
  const preview = () => {
    const newfields = editorRef.current.getValue();
    setFields(JSON.parse(newfields));
    setActiveKey("2");
  };

  const tabItems = [
    {
      key: "1",
      label: "Fields",
      children: (
        <Editor
          height="90vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(fields, null, 4)}
          onMount={handleEditorDidMount}
        />
      ),
    },
    {
      key: "2",
      label: "Preview",
      children: fields.map((attributes, index) => (
        <RenderFields key={index} attributes={attributes} index={index} />
      )),
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
      <Card
        title={`Edit Category ${category.name}`}
        extra={
          <Space size={10}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button
              danger
              type="primary"
              onClick={() =>
                setState({ ...state, showEditForm: false, record: {} })
              }
            >
              Cancel
            </Button>
          </Space>
        }
        className="edit-category-form"
      >
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
        <Tabs
          onChange={preview}
          type="card"
          defaultActiveKey={[activeKey]}
          items={tabItems}
        />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Card>
    </Form>
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
