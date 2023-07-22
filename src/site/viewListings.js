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
} from "antd";
import React, { useEffect, useState } from "react";
import { LuFilter } from "react-icons/lu";
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
		if (!contentLoaded) {
			if (state?.id) {
				getCategoryFields(state.category);
				setContentLoaded(true);
			} else {
				if (listings.isLoaded === false) return;
				let findListings = listings.data.find((item) => item.id === id);
				getCategoryFields(findListings.category);
				setData(findListings);
				setContentLoaded(true);
			}
		}
	}, [id, listings.isLoaded]);

	return (
		<section className="view-listings-details">
			<div className="container">
				<Row justify="space-between" align="top" gutter={[16, 16]}>
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
					<Col xs={24} sm={24} md={18} lg={18}>
						{contentLoaded ? (
							<Card className="listing-details">
								<Row justify="space-between" align="top" gutter={[16, 16]}>
									<Col span={24}>
										<Typography.Title level={3}>{data?.title}</Typography.Title>
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
										<Typography.Title level={5}>
											{data.description}
										</Typography.Title>
									</Col>
									<Divider>More Details</Divider>
									<Row justify="start" align="top" gutter={[16, 16]}>
										<Col xs={24} sm={24} md={12} lg={12}>
											<Row
												justify="space-between"
												align="top"
												gutter={[16, 16]}
											>
												{fields?.length > 0 &&
													fields.map((item, index) => {
														return item.name !== "images" &&
															item.name !== "title" &&
															item.name !== "description" ? (
															<Col span={12} key={item.name} key={index}>
																<Row>
																	<Col span={24} key={item.name}>
																		<Typography.Text
																			key={index}
																			className="field-label"
																			strong
																		>
																			{item.label}
																		</Typography.Text>
																	</Col>
																	<Col span={24} key={item.name}>
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
									<section className="comments"></section>
								</Row>
							</Card>
						) : (
							<Spin />
						)}
					</Col>
				</Row>
			</div>
		</section>
	);
};

export default ViewListings;
