import React from "react";
import {
	Layout,
	Dropdown,
	Row,
	Col,
	Space,
	Avatar,
	Typography,
	Menu,
	Modal,
} from "antd";

import logo from "../assets/images/logo.png";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

import { Link } from "@gatsbyjs/reach-router";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { updateAuth } from "../../store/reducers/auth";
import { navigate } from "@gatsbyjs/reach-router";
import { useDispatch } from "react-redux";
const { Header } = Layout;
const Hands2getherPrimaryHeader = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const getUserMenu = () => {
		let items = [];
		if (user.isAuth) {
			items.push(
				{
					key: "1",
					label: <Link to="/user">My Account</Link>,
				},
				{
					key: "2",
					label: (
						<a style={{ cursor: "pointer" }} onClick={() => logOut()}>
							Logout
						</a>
					),
				}
			);
		} else {
			items.push(
				{
					key: "1",
					label: <Link to="/login">Login</Link>,
				},
				{
					key: "2",
					label: <Link to="/register">Register</Link>,
				}
			);
		}

		return { items };
	};

	const logOut = () => {
		Modal.confirm({
			title: "Do you want to logout?",
			icon: <UserOutlined />,
			content: "You will be logged out of your account.",
			onOk: () => {
				signOut(getAuth()).then(() => {
					logoutSuccess();
				});
			},
			onCancel() {},
		});
	};
	const logoutSuccess = () => {
		dispatch(updateAuth({ isAuth: false }));
		navigate("/login");
	};

	return (
		<Header className="site-header">
			<div className="container">
				<Row justify="space-between" align="top">
					<Col flex={0} xs={22} sm={8} lg={4}>
						<div className="logo">
							<img src={logo} height={60} />
						</div>
					</Col>
					<Col flex={1} xs={2} sm={12} md={8} lg={16}>
						<Menu
							mode="horizontal"
							items={[
								{ key: "1", label: <Link to="/">Home</Link> },
								{
									key: "2",
									label: (
										<Link to="/categories/all categories/showall">
											Categories
										</Link>
									),
								},
								{ key: "3", label: "Add My Listing", link: "/contact" },
								{ key: "4", label: "Advanced Search", link: "/donate" },
							]}
							overflowedIndicator={<MenuOutlined />}
						/>
					</Col>
					<Col className="user-context" flex={0} xs={0} sm={4} md={4} lg={4}>
						<Dropdown menu={getUserMenu()} trigger={["hover"]}>
							<Space align="start" style={{ cursor: "pointer" }}>
								<Avatar
									size={45}
									style={{ backgroundColor: "#f5f5f5" }}
									src={
										user.isAuth ? (
											user.photoURL && <img src={user.photoURL} />
										) : (
											<UserOutlined />
										)
									}
									icon={
										user.isAuth ? (
											user.photoURL && <img src={user.photoURL} />
										) : (
											<UserOutlined />
										)
									}
								/>
								<Typography.Text strong>
									{user.isAuth ? user.displayName : "Guest"}
								</Typography.Text>
							</Space>
						</Dropdown>
					</Col>
				</Row>
			</div>
		</Header>
	);
};

export default Hands2getherPrimaryHeader;
