import {
	Card,
	Col,
	Divider,
	Empty,
	Form,
	Row,
	Select,
	Spin,
	Typography,
	Image,
	Skeleton,
	Button,
	Space,
	Avatar,
	Input,
} from "antd";
import React, { useEffect, useState } from "react";
import {
	LuAccessibility,
	LuFilter,
	LuMapPin,
	LuSunMedium,
	LuUserCog,
} from "react-icons/lu";
import { useSelector } from "react-redux";

const ViewListings = (props) => {
	const { id } = props;
	const { state } = props.location;
	const listings = useSelector((state) => state.listings);
	const categories = useSelector((state) => state.categories);
	const [contentLoaded, setContentLoaded] = useState(false);
	const [data, setData] = useState(state);
	const [fields, setFields] = useState([]);

	const getCategoryFields = (id) => {
		const category = categories.data.find((category) => category._id === id.id);
		let fields = category?.fields;
		console.log({ id, fields });
		setFields(fields);
	};

	useEffect(() => {
		if (listings.isLoaded && categories.isLoaded) {
			if (!contentLoaded) {
				if (state?.id) {
					getCategoryFields(state.category);
					setContentLoaded(true);
				} else {
					let findListings = listings.data.find((item) => item.id === id);
					getCategoryFields(findListings.category);
					setData(findListings);
					setContentLoaded(true);
				}
			}
		}
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
										</Col>
										<Col span={24}>
											<Typography.Text>{data.description}</Typography.Text>
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
																{data?.location?.city} {" - "}
																{data?.location?.state}
																{", "}
																{data?.location?.country}
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
											<section className="comments" style={{ marginTop: 30 }}>
												<Row justify="start" align="middle" gutter={[16, 16]}>
													<Col span={20}>
														<Form layout="vertical">
															<Form.Item label="Comment">
																<Input.TextArea rows={5} />
															</Form.Item>
														</Form>
													</Col>
													<Col span={2}>
														<Button type="primary" block>
															Post
														</Button>
													</Col>
												</Row>
											</section>
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
