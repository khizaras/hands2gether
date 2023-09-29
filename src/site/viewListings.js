import {
	Card,
	Col,
	Divider,
	Empty,
	Form,
	Row,
	Spin,
	Typography,
	Image,
	Skeleton,
	Button,
	Space,
	Avatar,
	Input,
	Steps,
	Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import {
	LuAccessibility,
	LuMapPin,
	LuSunMedium,
	LuUserCog,
	LuThumbsUp,
	LuThumbsDown,
	LuAsterisk,
} from "react-icons/lu";
import { useSelector } from "react-redux";
import { addCommentAPI, getCommentsOfListingAPI } from "../api/listings";
import { useDispatch } from "react-redux";
import { updateComments } from "../store/reducers/listings";
import moment from "moment";

const ViewListings = (props) => {
	const { id } = props;
	const { state } = props.location;
	const listings = useSelector((state) => state.listings);
	const user = useSelector((state) => state.user);
	const categories = useSelector((state) => state.categories);
	const [contentLoaded, setContentLoaded] = useState(false);
	const [data, setData] = useState(state);
	const [currentComments, setCurrentComments] = useState([]); // [
	const [fields, setFields] = useState([]);
	const dispatch = useDispatch();

	const getCategoryFields = (id) => {
		const category = categories.data.find((category) => category._id === id.id);
		let fields = category?.fields;
		setFields(fields);
	};
	const [commentform] = Form.useForm();

	const addComment = (values) => {
		Modal.confirm({
			title: "Confirm",
			content: "Are you sure you want to post this comment?",
			okText: "Yes",
			cancelText: "No",
			onOk: () => {
				let commentData = {
					comment: values.comment,
					listings: id,
					user: {
						id: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					date: moment().format("YYYY-MM-DD HH:mm:ss"),
				};
				console.log({ commentData, values });
				addCommentAPI(commentData).then((result) => {
					setCurrentComments([...currentComments, result]);
					dispatch(updateComments([...currentComments, result]));
					console.log({ result });
					commentform.resetFields();
				});
			},
		});
	};

	const getComments = (id) => {
		const { comments } = listings;
		let findCurrentComments = comments.filter((comment) => {
			return comment.listings === id;
		});
		if (findCurrentComments.length > 0) {
			setCurrentComments(findCurrentComments);
		} else {
			getCommentsOfListingAPI(id).then((currentListingComments) => {
				setCurrentComments([...currentListingComments, ...currentComments]);
				dispatch(updateComments([...comments, ...currentListingComments]));
			});
		}
	};

	useEffect(() => {
		if (listings.isLoaded && categories.isLoaded) {
			if (!contentLoaded) {
				if (state?.id) {
					getCategoryFields(state.category);
					setContentLoaded(true);
					getComments(id);
				} else {
					getComments(id);
					let findListings = listings.data.find((item) => item.id === id);
					getCategoryFields(findListings.category);
					setData(findListings);
					setContentLoaded(true);
				}
			}
		}
		return () => {};
	}, [id, listings.isLoaded]);

	return (
		<section className="view-listings-details">
			<div className="container">
				{contentLoaded ? (
					<Row justify="space-between" align="top" gutter={[16, 16]}>
						<Col xs={24} sm={24} md={18} lg={18}>
							{contentLoaded ? (
								<Card className="listing-details">
									<Row justify="space-between" align="top" gutter={[16, 16]}>
										<Col span={24}>
											<Typography.Title level={3}>
												{data?.title}
											</Typography.Title>
										</Col>
										<Divider />
										<Col span={24} className="listing-images">
											<Image.PreviewGroup>
												<Row justify="start" align="top" gutter={[16, 16]}>
													{data.images.length > 0 ? (
														data.images.map((item, index) => {
															return (
																<Col xs={12} sm={12} md={8} lg={8} key={index}>
																	<Image preview src={item} />
																</Col>
															);
														})
													) : (
														<Empty description="No images available" />
													)}
												</Row>
											</Image.PreviewGroup>
										</Col>
										<Col span={24}>
											<div
												dangerouslySetInnerHTML={{ __html: data.description }}
											/>

											<Divider />
										</Col>
										<Col span={24}>
											<Row justify="start" align="top" gutter={[16, 16]}>
												<Col span={8} lg={8} md={8} sm={12} xs={12}>
													<Space align="center" size={10}>
														<LuAccessibility size={40} />
														<Space direction="vertical">
															<Typography.Text strong>
																Listing Type
															</Typography.Text>
															<Typography.Text>
																{data.listingType}
															</Typography.Text>
														</Space>
													</Space>
												</Col>
												<Col span={8} lg={8} md={8} sm={12} xs={12}>
													<Space align="center" size={10}>
														<LuSunMedium size={40} />
														<Space direction="vertical">
															<Typography.Text strong>Quantity</Typography.Text>
															<Typography.Text>{data.quantity}</Typography.Text>
														</Space>
													</Space>
												</Col>
												<Col span={8} lg={8} md={8} sm={12} xs={12}>
													<Space align="center" size={10}>
														<LuMapPin size={40} />
														<Space direction="vertical">
															<Typography.Text strong>Location</Typography.Text>
															<Typography.Text>
																{data?.location?.city?.name} {" - "}
																{data?.location?.state?.name}
																{", "}
																{data?.location?.country?.name}
															</Typography.Text>
														</Space>
													</Space>
												</Col>
											</Row>
										</Col>

										<Divider>More Details</Divider>
										<Row align="top" gutter={[16, 16]}>
											<Col xs={24} sm={24} md={24} lg={24}>
												<Row justify="Details" align="top" gutter={[16, 16]}>
													{fields?.length > 0 &&
														fields.map((item, index) => {
															return item.name !== "images" &&
																item.name !== "title" &&
																item.name !== "description" ? (
																<Col
																	span={8}
																	lg={8}
																	md={8}
																	sm={12}
																	xs={12}
																	key={index}
																>
																	<Row>
																		<Col span={24}>
																			<Typography.Text
																				key={index}
																				className="field-label"
																				strong
																			>
																				{item.label}
																			</Typography.Text>
																		</Col>
																		<Col span={24}>
																			<Typography.Text
																				key={index}
																				className="field-value"
																			>
																				{data[item.name]}
																			</Typography.Text>
																		</Col>
																	</Row>
																</Col>
															) : null;
														})}
												</Row>
											</Col>
										</Row>
										<Divider />

										<Col span={24}>
											<Typography.Title level={5}>
												Comments{" "}
												{currentComments.length > 0 &&
													` (${currentComments.length}) `}
											</Typography.Title>
											<Divider />
											<Steps
												status="process"
												direction="vertical"
												size="default"
												items={currentComments.map((item) => {
													return {
														title: (
															<Space
																align="start"
																size={1}
																style={{ marginLeft: 30 }}
															>
																<Typography.Text strong style={{ margin: 0 }}>
																	{item.user.displayName}
																</Typography.Text>
																<span>&nbsp;</span>
																<Typography.Text disabled style={{ margin: 0 }}>
																	{moment(item?.date).format(
																		"MMMM Do YYYY h:mm:ss a"
																	)}
																</Typography.Text>
															</Space>
														),
														description: (
															<section
																style={{ marginLeft: 30, marginTop: 15 }}
															>
																<Typography.Text>
																	<div
																		dangerouslySetInnerHTML={{
																			__html: item.comment,
																		}}
																	/>
																</Typography.Text>
																<Row justify="end" align="middle">
																	<Col flex={0}>
																		<Space>
																			<Button
																				type="link"
																				size="small"
																				icon={<LuThumbsUp />}
																			>
																				0
																			</Button>
																			<Button
																				type="link"
																				size="small"
																				icon={<LuThumbsDown />}
																			>
																				0
																			</Button>
																		</Space>
																	</Col>
																	<Col flex={0}>
																		<Button
																			type="link"
																			danger
																			size="small"
																			icon={<LuAsterisk />}
																		>
																			Report
																		</Button>
																	</Col>
																</Row>
															</section>
														),
														icon: (
															<Avatar
																size={50}
																src={item.user.photoURL}
																icon={<LuUserCog />}
																style={{ marginRight: 400 }}
															/>
														),
													};
												})}
											/>
										</Col>
										<Col span={24}>
											<Form
												layout="vertical"
												onFinish={addComment}
												form={commentform}
											>
												<section className="comments" style={{ marginTop: 30 }}>
													<Row justify="start" align="middle" gutter={[16, 16]}>
														<Col span={20}>
															<Form.Item
																label="comment"
																name="comment"
																rules={[
																	{
																		required: true,
																		message: "Please input your comment!",
																	},
																	{
																		min: 20,
																		message:
																			"Comment must be atleast 20 characters long",
																	},
																	{
																		max: 500,
																		message:
																			"Comment must be less than 500 characters long",
																	},
																]}
															>
																<Input.TextArea rows={5} />
															</Form.Item>
														</Col>
														<Col span={2}>
															<Button type="primary" htmlType="submit">
																Post
															</Button>
														</Col>
													</Row>
												</section>
											</Form>
										</Col>
									</Row>
								</Card>
							) : (
								<Spin />
							)}
						</Col>

						<Col xs={24} sm={24} md={6} lg={6}>
							<Card className="actions-card">
								<section className="author" style={{ marginBottom: 30 }}>
									<Row justify="start" align="top" gutter={[16, 16]}>
										<Col span={24}>
											<Typography.Text disabled>
												Listing Posted by
											</Typography.Text>
										</Col>
										<Col span={24}>
											<Space>
												{data?.user?.photoURL ? (
													<Avatar size={64} src={data?.user?.photoURL} />
												) : (
													<Avatar size={64} icon={<LuUserCog />} />
												)}
												<Space direction="vertical" size={0}>
													<Typography.Text strong>
														{data?.user?.displayName}
													</Typography.Text>
													<Typography.Text disabled>
														{data?.user?.email}
													</Typography.Text>
												</Space>
											</Space>
										</Col>
									</Row>
								</section>
								<section className="actions">
									{data?.listingType === "wantHelp" ? (
										<Button type="primary" block size="large">
											Offer Help
										</Button>
									) : (
										<Button type="primary" block size="large">
											Requst Help
										</Button>
									)}
								</section>
								<Divider />
								<section className="contact">
									<Row>
										<Col span={24}>
											<Space direction="vertical">
												<Typography.Title level={5}>Go Fundme</Typography.Title>
												<Typography.Text disabled>
													Not Specified
												</Typography.Text>
											</Space>
										</Col>
									</Row>
									<Divider />
									<Row>
										<Col span={24}></Col>
										<Space direction="vertical">
											<Typography.Title level={5}>
												Other Donations
											</Typography.Title>
											<Typography.Text disabled>Not Specified</Typography.Text>
										</Space>
									</Row>
								</section>
							</Card>
						</Col>
					</Row>
				) : (
					<ListingsPlaceholder />
				)}
			</div>
		</section>
	);
};

export default ViewListings;

const ListingsPlaceholder = () => {
	return (
		<Row>
			<Col xs={24} sm={24} md={18} lg={18}>
				{Array(3)
					.fill()
					.map((item, index) => {
						return <Skeleton title="Loading please wait" key={index} active />;
					})}
			</Col>
			<Col xs={24} sm={24} md={6} lg={6}>
				{Array(3)
					.fill()
					.map((item, index) => {
						return <Skeleton key={index} active />;
					})}
			</Col>
		</Row>
	);
};

/* 

<Col xs={0} sm={0} md={6} lg={6}>
						<Card className="filtercard">
							<Typography.Title level={5}>
								<LuFilter /> Filter
							</Typography.Title>
							<Divider />
							<Form layout="vertical">
								<Form.Item label="Location">
									<Select placeholder="Select a location" />
								</Form.Item>
								<Form.Item label="Category">
									<Select placeholder="Select a category" />
								</Form.Item>
								<Form.Item label="Listing Type">
									<Select placeholder="Select a listing type" />
								</Form.Item>
							</Form>
						</Card>
					</Col>

*/
