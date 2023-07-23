import React, { useEffect } from "react";
import "./addListings.less";
import {
	Breadcrumb,
	Button,
	Col,
	DatePicker,
	Divider,
	Empty,
	Form,
	Input,
	Modal,
	Row,
	Select,
	Space,
	Steps,
	Switch,
	Typography,
	Upload,
} from "antd";
import locale from "antd/es/date-picker/locale/en_US";
import { LuChevronRight, LuHelpCircle, LuUpload } from "react-icons/lu";
import { Link, navigate } from "@gatsbyjs/reach-router";
import { useSelector } from "react-redux";
import { uploadListingImage } from "../../api/files";
import { addListingsAPI } from "../../api/listings";
import { useState } from "react";
import { Country, State, City } from "country-state-city";
import moment from "moment";
const UserAddListings = (props) => {
	const { location, id } = props;
	const [isEdit, setIsEdit] = useState(id ? true : false);
	const { state } = location;
	const { user } = useSelector((state) => state.user);

	return (
		<section className="add-listings">
			<div className="breadcrumb">
				<Breadcrumb
					separator={<LuChevronRight />}
					items={[
						{
							title: <Link to="/">Home</Link>,
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
						<Typography.Title level={2}>
							{isEdit ? "Edit" : "Add"} Listings
						</Typography.Title>
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
				<ChooseCategory isEdit={id ? true : false} data={{ ...state }} />
			</div>
		</section>
	);
};

export default UserAddListings;

const ChooseCategory = ({ isEdit, data = null }) => {
	const [form] = Form.useForm();
	const [state, setState] = useState({
		current: 0,
		category: data?.category?.id || null,
		name: null,
		fields: data?.fields || [],
		llistingLocation: {
			country: data?.country || null,
			state: data?.state || null,
			city: data?.city || null,
		},
	});

	useEffect(() => {
		if (isEdit) {
			let categoryData = categories.data.find(
				(category) => category._id === data.category.id
			);
			form.setFieldsValue({
				...data,
				expiryDate: moment(data.expiryDate).format("YYYY-MM-DD"),
				images: data.images.length > 0 ? data.images : null,
				category: data.category.id,
			});
			setState({
				...state,
				category: data.category.id,
				fields: categoryData?.fields || [],
			});
		}
	}, [data]);

	const categories = useSelector((state) => state.categories);
	const user = useSelector((state) => state.user);
	const categoriesList = categories.data.map((category) => ({
		label: category.name,
		value: category._id,
	}));

	const getCategoryFields = (id) => {
		const category = categories.data.find((category) => category._id === id);
		setState({
			...state,
			category: id,
			fields: category.fields,
			name: category.name,
		});
	};

	const nextStep = () => {
		if (state.category === null) {
			Modal.error({
				title: "Error",
				content: `Please select a category`,
			});
			return;
		}
		setState({ ...state, current: state.current + 1 });
	};
	const prevStep = () => {
		setState({ ...state, current: state.current - 1 });
	};
	const onFinish = (values) => {
		console.log({ values });
		addListingsAPI({ ...values, user }).then((id) => {
			Modal.success({
				title: "Success",
				content: `Your listing has been added successfully. Your listing id is ${id}`,
			});
			navigate("/user/myListings");
		});
	};
	const stepsChange = (current) => {
		if (state.category === null) {
			Modal.error({
				title: "Error",
				content: `Please select a category`,
			});
			return;
		}
		setState({ ...state, current });
	};

	return (
		<div className="choose-category">
			<Form form={form} layout="vertical" size="large" onFinish={onFinish}>
				<Steps
					current={state.current}
					className="choose-category__steps"
					type="navigation"
					onChange={stepsChange}
					items={[
						{
							title: "Choose Category",
						},
						{
							title: state.name
								? `Add more  ${state.name} details`
								: "Add Details ",
						},
						{
							title: "Finish",
						},
					]}
				></Steps>

				<section className={`step-1 ${state.current === 0 && "show"}`}>
					<Form.Item
						label="Category"
						name="category"
						required={true}
						rules={[{ required: true, message: "Please select a category!" }]}
					>
						<Select
							onChange={(value) => getCategoryFields(value)}
							placeholder="Select a category"
							allowClear
							showSearch
							options={categoriesList}
						/>
					</Form.Item>
					<ShowFixedPrompts mainState={state} setState={setState} />
				</section>

				<section className={`step-2 ${state.current === 1 && "show"}`}>
					<RenderFields fields={state.fields} isEdit={isEdit} />
					<Row justify="start" align="middle" gutter={[24, 24]}>
						<Col span={24}>
							<Form.Item
								label={`Upload ${state.name || ""} Image`}
								name="listingImages"
							>
								<Upload
									customRequest={uploadListingImage}
									name="avatar"
									listType="picture-card"
									maxCount={3}
								>
									<Button type="ghost" icon={<LuUpload />} />
								</Upload>
							</Form.Item>
						</Col>
					</Row>
				</section>

				<Divider />

				<Row justify="end" align="middle" gutter={[24, 24]}>
					<Col span={6}>
						<Space size={10} align="baseline">
							<Button
								type="primary"
								disabled={state.current === 0}
								onClick={() => prevStep()}
							>
								Previous
							</Button>

							<Button
								type="primary"
								disabled={state.current === 2}
								onClick={() => nextStep()}
							>
								Next
							</Button>
							{state.current === 2 && (
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Save Listing
									</Button>
								</Form.Item>
							)}
						</Space>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const RenderFields = ({ fields, isEdit }) => {
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
								<DatePicker locale={locale} style={{ width: "100%" }} />
							)}
							{field.type === "file" && (
								<Upload
									fileList={isEdit ? field.images : []}
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

const ShowFixedPrompts = ({ mainState, setState }) => {
	return (
		<div className="show-fixed-prompts">
			<Form.Item
				label="Title"
				name="title"
				required
				rules={[{ required: true, message: "Please input your title!" }]}
				help={
					<Typography.Text type="secondary">
						<LuHelpCircle /> Make it short and clear as possible to attract more
						people to your listing
					</Typography.Text>
				}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Description"
				name="description"
				required
				rules={[{ required: true, message: "Please input your description!" }]}
				help={
					<Typography.Text type="secondary">
						<LuHelpCircle /> Describe what makes your listing unique, what you
						are offering or seeking, and who you are.
					</Typography.Text>
				}
			>
				<Input.TextArea rows={5} allowClear />
			</Form.Item>
			<Row justify="start" align="middle" gutter={[24, 24]}>
				<Col span={8}>
					<Form.Item
						label="Listing Type"
						name="listingType"
						required
						rules={[
							{ required: true, message: "Please select the listing type!" },
						]}
					>
						<Select
							options={[
								{ label: "I wanted to help", value: "readytoHelp" },
								{ label: "I am seeking help", value: "wantHelp" },
							]}
							placeholder="Select a listing type"
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label="Specify Quantity"
						name="quantity"
						required
						rules={[{ required: true, message: "Please input your quantity!" }]}
					>
						<Select
							options={[
								{ label: "1 to 10", value: "10" },
								{ label: "11 to 20", value: "20" },
								{ label: "21 to 30", value: "30" },
								{ label: "31 to 40", value: "40" },
								{ label: "41 to 50", value: "50" },
								{ label: "51 to 60", value: "60" },
								{ label: "61 to 70", value: "70" },
								{ label: "71 to 80", value: "80" },
								{ label: "81 to 90", value: "90" },
								{ label: "91 to 100", value: "100" },
								{ label: "More than 100", value: "more" },
							]}
							placeholder="Select a quantity"
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label="Expiry Date"
						name="expiryDate"
						required
						rules={[
							{ required: true, message: "Please input your expiryDate!" },
						]}
					>
						<DatePicker locale={locale} style={{ width: "100%" }} />
					</Form.Item>
				</Col>
			</Row>
			<Divider />
			<Row justify="start" align="middle" gutter={[24, 24]}>
				<Col span={8}>
					<Space size={10} align="baseline" direction="vertical">
						<Typography.Text strong>
							Do you want to show the location of the listings?
						</Typography.Text>
						<Form.Item name="showLocation">
							<Switch checkedChildren="Yes" unCheckedChildren="No" />
						</Form.Item>
					</Space>
				</Col>
				<Col span={8}>
					<Space size={10} align="baseline" direction="vertical">
						<Typography.Text strong>Show contact infomation?</Typography.Text>
						<Form.Item name="showContact">
							<Switch checkedChildren="Yes" unCheckedChildren="No" />
						</Form.Item>
					</Space>
				</Col>
				<Col span={8}>
					<Space size={10} align="baseline" direction="vertical">
						<Typography.Text strong>Allow Comments?</Typography.Text>
						<Form.Item name="allowComments">
							<Switch checkedChildren="Yes" unCheckedChildren="No" />
						</Form.Item>
					</Space>
				</Col>
			</Row>
			<Row justify="start" align="middle" gutter={[24, 24]}>
				<Col span={24}>
					<Form.Item label="Address" name={["location", "address"]}>
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Row justify="start" align="middle" gutter={[24, 24]}>
				<Col span={8}>
					<Form.Item
						label="Country"
						name={["location", "country"]}
						required
						rules={[{ required: true, message: "Please input your country!" }]}
						help={
							<Typography.Text type="secondary">
								<LuHelpCircle /> Search Country by Country Code
							</Typography.Text>
						}
					>
						<Select
							autoComplete="none"
							mode="single"
							showSearch
							options={Country.getAllCountries().map((country) => ({
								label: country.name,
								value: country.isoCode,
							}))}
							placeholder="Select a country"
							onChange={(value) => {
								setState({
									...mainState,
									llistingLocation: {
										...mainState.llistingLocation,
										country: value,
									},
								});
							}}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label="State"
						name={["location", "state"]}
						required
						rules={[{ required: true, message: "Please input your state!" }]}
						help={
							<Typography.Text type="secondary">
								<LuHelpCircle /> Search State by State Code
							</Typography.Text>
						}
					>
						<Select
							notFoundContent={
								<Empty description="Please select a country first" />
							}
							autoComplete="none"
							mode="single"
							showSearch
							options={
								State.getStatesOfCountry(
									mainState.llistingLocation.country
								)?.map((state) => ({
									label: state.name,
									value: state.isoCode,
								})) || []
							}
							placeholder="Select a state"
							onChange={(value) => {
								setState({
									...mainState,
									llistingLocation: {
										...mainState.llistingLocation,
										state: value,
									},
								});
							}}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						label="City"
						name={["location", "city"]}
						required
						rules={[{ required: true, message: "Please input your city!" }]}
						help={
							<Typography.Text type="secondary">
								<LuHelpCircle /> Search City by City Code
							</Typography.Text>
						}
					>
						<Select
							notFoundContent={
								<Empty description="Please select a state first" />
							}
							autoComplete="none"
							mode="single"
							showSearch
							options={
								City.getCitiesOfState(
									mainState.llistingLocation.country,
									mainState.llistingLocation.state
								)
									?.map((city) => ({
										label: city.name,
										value: city.name,
									}))
									.sort((a, b) => a.label.localeCompare(b.label)) || []
							}
							placeholder="Select a city"
							onChange={(value) => {
								setState({
									...mainState,
									llistingLocation: {
										...mainState.llistingLocation,
										city: value,
									},
								});
							}}
						/>
					</Form.Item>
				</Col>
			</Row>
		</div>
	);
};
