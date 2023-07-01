import React, { useEffect, useState } from "react";
import {
  Tabs,
  Button,
  Checkbox,
  Form,
  Input,
  Alert,
  Typography,
  Divider,
  notification,
  Steps,
  Switch,
  ConfigProvider,
} from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "./login.less";
import logo from "../assets/images/logo-white.png";
import login from "../assets/images/login.png";

import { useDispatch } from "react-redux";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { updateAuth } from "../store/reducers/auth";
import { signInWithCredentials } from "../api/login";
import { H2GTheme } from "../constants/theme";
import { navigate } from "@gatsbyjs/reach-router";
const H2GLoginPage = () => {
  const [state, setState] = useState({
    isAuth: false,
    signinError: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        loginSuccess({ user, type: "normal" });
      }
    });
  }, [state.isAuth]);

  const authHandler = ({ email, password }) => {
    setState({ ...state, signinError: null });
    signInWithCredentials({ email, password })
      .then((user) => {
        loginSuccess({ user, type: "normal" });
      })
      .catch((error) => {
        setState({ ...state, signinError: error });
      });
  };
  const signinWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        loginSuccess({ user, type: "google" });
        notification.success({
          message: "Login Success",
          description: `Welcome ${user.displayName}`,
          placement: "topRight",
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setState({ ...state, signinError: error });
        // ...
      });
  };

  const loginSuccess = ({ user, type }) => {
    setState({ ...state, isAuth: true });
    dispatch(updateAuth({ isAuth: true, ...user, type }));
    navigate("/");
  };

  const items = [
    {
      key: "signin",
      label: `Signin`,
      children: (
        <Singinform
          authHandler={authHandler}
          signinWithGoogle={signinWithGoogle}
          signinError={state.signinError}
        />
      ),
    },
    {
      key: "signup",
      label: `Signup`,
      children: <SignupForm />,
    },
  ];
  return (
    <ConfigProvider theme={{ token: H2GTheme.token }}>
      <section className="login-page">
        <section
          className="banner" /* style={{background:`url('${wave}'),  #6e4abd`}} */
        >
          <div className="content">
            <img src={login} alt="h2gfit-logo" height={500} />
            <img src={logo} alt="h2gfit-logo" width={400} />
          </div>
        </section>
        <section className="form">
          <div className="content">
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        </section>
      </section>
    </ConfigProvider>
  );
};

export default H2GLoginPage;

const Singinform = ({ authHandler, signinError, signinWithGoogle }) => {
  const onFinish = (values) => {
    authHandler({
      email: values.email,
      password: values.password,
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="signin">
      <div className="title">
        <Typography.Title level={3}>Authentication Required</Typography.Title>
        <Typography.Text>
          Please enter your credentials to continue.
        </Typography.Text>
      </div>
      <Divider />
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          label="E-mail Address"
          name="email"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be minimum 6 characters." },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login{" "}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            icon={<GoogleOutlined />}
            block
            type="default"
            onClick={() => signinWithGoogle()}
          >
            {" "}
            Singin in with Google
          </Button>
        </Form.Item>
        {signinError?.errorMessage && (
          <Alert
            message="Error"
            description={signinError?.errorMessage}
            type="error"
            showIcon
            closable
          />
        )}
      </Form>
    </div>
  );
};

const SignupForm = () => {
  const [form] = Form.useForm();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    displayContactsinformation: "",
    sendNotification: "",
  };
  form.setFieldValue(initialValues);
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };
  const next = () => {
    setCurrent(current + 1);
    console.log({ errorss: form.getFieldsError() });
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Step 1",
      subTitle: "Account Details",
      content: <AccountDetails Form form={form} next={next} />,
    },
    {
      title: "Step 2",
      content: <PersonalDetails />,
      subTitle: "Personal Details",
    },
    {
      title: "Step 3",
      content: <ContactsPreference />,
      subTitle: "Contacts & Listing Preferences",
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    subTitle: item.subTitle,
  }));

  const onFinish = (values) => {
    console.log({ values });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="signup">
      <Form
        preserve
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        scrollToFirstError
      >
        <Steps
          type="navigation"
          current={current}
          onChange={onChange}
          items={items}
        />

        <div>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => form.submit()}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

const AccountDetails = ({ form, next }) => {
  return (
    <div style={{ marginTop: 50 }}>
      <div className="title">
        <Typography.Title level={3}>Dont have an account?</Typography.Title>
        <Typography.Text>Let's create one.</Typography.Text>
      </div>
      <Divider />
      <Form.Item
        label="E-mail Address"
        name="email"
        rules={[
          { required: true, message: "Please input your username!" },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be minimum 6 characters." },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be minimum 6 characters." },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </div>
  );
};

const PersonalDetails = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your Full Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[{ required: true, message: "Please input your Phone Number!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your Address!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please input your Country!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "Please input your City!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        rules={[{ required: true, message: "Please input your State!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Zip Code"
        name="zip"
        rules={[{ required: true, message: "Please input your Zip Code!" }]}
      >
        <Input />
      </Form.Item>
    </div>
  );
};

const ContactsPreference = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <Form.Item
        label="Display My Email & Phone Number to conatct me for the Listings"
        name="displayContactsinformation"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label="Send E-Mail and SMS / Whatsapp when some one replied to my listings"
        name="sendNotification"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </div>
  );
};
