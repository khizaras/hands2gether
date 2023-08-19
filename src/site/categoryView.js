import { Link } from "@gatsbyjs/reach-router";
import { Card, Col, Divider, Row, Skeleton, Space, Typography } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RenderIcon } from "../api/categories";
import { getListingsWithFillterAPI } from "../api/listings";
import { updatefilteredListingsReducer } from "../store/reducers/listings";
import { ListingsCard } from "./homepage";

const CategoryView = (props) => {
	const { id, name } = props;
	const listings = useSelector((state) => state.listings);
	const categories = useSelector((state) => state.categories);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [summaryByCategories, setSummaryByCategories] = useState([]);

	useEffect(() => {
		if (listings.isLoaded && categories.isLoaded) {
			const categories = getSummaryByCategories(listings.data);
			setSummaryByCategories(categories);
			setIsLoaded(true);
		}
	}, [listings, categories]);
	useEffect(() => {
		if (listings.isLoaded && listings.data.length > 0) {
			getListingsWithFillterAPI({
				filter: {
					category: id,
				},
				listings: listings.data,
			}).then((listings) => {
				dispatch(updatefilteredListingsReducer(listings));
			});
		}
	}, [id, name]);

	return (
		<section className="category-view">
			<div className="container">
				{isLoaded ? (
					<Row justify="start" align="top" gutter={[16, 16]}>
						<Col xs={24} sm={24} md={8} lg={6}>
							<section className="category-filter-section">
								<Typography.Title level={4} className="title">
									Categories
								</Typography.Title>
								<Divider />
								{summaryByCategories.map((category, index) => (
									<div key={index} className="category-filter-item">
										<Link to={`/categories/${category.name}/${category.id}`}>
											<div className="content">
												<RenderIcon icon={category.icon} className="icon" />
												<Typography.Text className="title">
													{category.name}
												</Typography.Text>
												<Typography.Text className="count" strong>
													{category.count}
												</Typography.Text>
											</div>
										</Link>
									</div>
								))}
							</section>
						</Col>
						<Col xs={24} sm={24} md={16} lg={18}>
							<Card>
								<section className="category-listings-section">
									<Typography.Title
										level={4}
										type="secondary"
										className="title"
									>
										You are currently viewing listings in {name}
									</Typography.Title>
								</section>
								<section className="listings-section">
									<div className="container">
										{listings.filtered.length > 0 ? (
											<Row justify="start" align="top" gutter={[16, 16]}>
												{listings.filtered.map((listing, index) => (
													<ListingsCard key={index} listing={listing} />
												))}
											</Row>
										) : (
											<Row justify="start" align="top" gutter={[16, 16]}>
												<Col span={24}>
													<Typography.Title level={3}>
														No Listings Found for your search criteria :(
													</Typography.Title>
													<Typography.Text strong>
														But you can create one
													</Typography.Text>
												</Col>
											</Row>
										)}
									</div>
								</section>
							</Card>
						</Col>
					</Row>
				) : (
					<Row justify="start" align="top" gutter={[16, 16]}>
						<Col xs={24} sm={24} md={8} lg={6}>
							<Skeleton active />
							<Divider />
							<Skeleton active />
							<Divider />
							<Skeleton active />
						</Col>
						<Col xs={24} sm={24} md={16} lg={18}>
							<Skeleton active />
							<Divider />
							<Skeleton active />
						</Col>
					</Row>
				)}
			</div>
		</section>
	);
};

export default CategoryView;

const getSummaryByCategories = (listings) => {
	const categories = {};
	listings.forEach((listing) => {
		if (categories[listing.category.name]) {
			categories[listing.category.name] = {
				count: categories[listing.category.name].count + 1,
				id: categories[listing.category.name].id,
				icon: categories[listing.category.name].icon,
			};
		} else {
			categories[listing.category.name] = {
				count: 1,
				id: listing.category.id,
				icon: listing.category.icon,
			};
		}
	});
	let convertToArray = [];
	for (const [key, value] of Object.entries(categories)) {
		convertToArray.push({ name: key, ...value });
	}

	return convertToArray;
};
