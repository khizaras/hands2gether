import React, { useEffect } from "react";
import {
	Row,
	Col,
	Space,
	Typography,
	Input,
	Radio,
	Spin,
	Button,
	Carousel,
	Badge,
	Empty,
} from "antd";
import "antd/dist/reset.css";
import "./assets/style/index.less";

import { ImList, ImLocation, ImTable } from "react-icons/im";

import { useSelector } from "react-redux";
import LocationPickerPopup from "./components/locationPicker";
import { Layout } from "antd";
import banner1 from "./assets/images/h2g-banners.png";
import { RenderIcon } from "../api/categories";
import { LuEye, LuMessagesSquare, LuSuperscript } from "react-icons/lu";
import { Link } from "@gatsbyjs/reach-router";
import { IconText } from "./user/mylistings";

const { Content } = Layout;
const Hands2getherHomepageContent = () => {
	const user = useSelector((state) => state.user);
	const categories = useSelector((state) => state.categories);
	const listings = useSelector((state) => state.listings);

	useEffect(() => {
		if (categories.isLoaded && listings.isLoaded) {
			setState({ isCategoriesLoaded: true });
		}
	}, [categories, listings]);
	const { geolocation } = user;

	const [state, setState] = React.useState({
		isCategoriesLoaded: false,
	});
	return (
		<section className="homepage-content">
			<section className="banner-content">
				<div className="container">
					<Row
						justify="center"
						align="middle"
						gutter={[16, 16]}
						className="bg-img"
						style={{ background: `url('${banner1}')` }}
					>
						<Col flex={1}>
							<div className="banner-text">
								<Typography.Title
									level={1}
									style={{ fontFamily: "Inkfree", fontSize: 50 }}
								>
									Join your hands to help the{" "}
								</Typography.Title>
								<Typography.Title
									level={2}
									style={{ fontFamily: "Inkfree", fontSize: 60 }}
								>
									Needy ones
								</Typography.Title>
								<Button type="default" size="large">
									See Listings
								</Button>
							</div>
						</Col>
					</Row>
				</div>
			</section>
			{state.isCategoriesLoaded ? (
				<Content className="site-home-content">
					<section className="search-placeholder">
						<div className="container">
							<Row justify="center" align="top" gutter={[16, 16]}>
								<Col flex={1}>
									<Input.Search
										size="large"
										placeholder="Search for food, shelter, etc..."
										enterButton
									/>
								</Col>
								<Col flex={0}>
									<Space>
										<Radio.Group
											size="large"
											defaultValue="a"
											optionType="button"
											buttonStyle="solid"
											options={[
												{
													label: <ImList />,
													value: "grid",
												},
												{
													label: <ImTable />,
													value: "Table",
												},
											]}
										/>

										<LocationPickerPopup address={geolocation.address} />
									</Space>
								</Col>
							</Row>
						</div>
					</section>
					<section className="categories-section">
						<div className="container">
							<div className="categories-list">
								{categories.data.map((item, index) => (
									<div className="category-item" key={index}>
										<Link
											to={`/categories/${item.name}/${item._id}`}
											state={item}
										>
											<div className="category-item-image">
												<RenderIcon icon={item.icon} />
											</div>
											<div className="category-item-title">
												<Typography.Title level={4}>
													{item.name}
												</Typography.Title>{" "}
											</div>
										</Link>
									</div>
								))}
							</div>
						</div>
					</section>
					<section className="listings-section">
						<div className="container">
							{listings.filtered.length > 0 ? (
								<Row justify="start" align="top" gutter={[16, 16]}>
									<Col span={24}>
										<Typography.Title level={2}>
											Recent Listings
										</Typography.Title>
									</Col>
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
				</Content>
			) : (
				<Spin size="large" />
			)}
		</section>
	);
};

export default Hands2getherHomepageContent;

export const ListingsImageCarousel = ({ listing }) => {
	return (
		<Carousel autoplay>
			{listing.images.map((item, index) => (
				<div key={index}>
					<img src={item} alt="listing" />
				</div>
			))}
		</Carousel>
	);
};

export const ListingsCard = ({ listing }) => {
	return (
		<Col xs={24} sm={12} md={8} lg={6} xl={6}>
			<div className="listings-list">
				<Link to={`/listings/${listing.id}`} state={listing}>
					<Badge.Ribbon text={listing.listingType}>
						<div className="listings-item">
							<div className="listings-item-image">
								<ListingsImageCarousel listing={listing} />
							</div>
							<div className="listings-item-container">
								<div className="listings-item-title">
									<Typography.Title
										level={4}
										ellipsis={{
											rows: 2,
											expandable: false,
											symbol: "more",
										}}
									>
										{listing.title}
									</Typography.Title>
								</div>
								<div className="listings-item-details">
									<Row justify="start" align="middle" gutter={[16, 16]}>
										<Col span={8}>
											<Space size={0} align="start" direction="vertical">
												<Typography.Text>Category </Typography.Text>
												<Typography.Text strong>
													{listing.category.name}
												</Typography.Text>
											</Space>
										</Col>
										<Col span={8}>
											<Space size={0} align="start" direction="vertical">
												<Typography.Text>Quantity </Typography.Text>
												<Typography.Text strong>
													{listing.quantity}
												</Typography.Text>
											</Space>
										</Col>
										{listing.category.filters.map((filter, index) => (
											<Col key={index} span={8}>
												<Space direction="vertical" size={0} align="start">
													<Typography.Text>{filter}</Typography.Text>
													<Typography.Text strong>
														{listing[filter]}
													</Typography.Text>
												</Space>
											</Col>
										))}
									</Row>

									<Row
										justify="end"
										align="bottom"
										gutter={[16, 16]}
										className="stats"
									>
										<Col flex={1}>
											<Space size={10}>
												<ImLocation />
												<Typography.Text strong>
													{listing.location?.city?.name} ,{" "}
													{listing?.location?.state?.name} ,{" "}
													{listing?.location?.country?.name}
												</Typography.Text>
											</Space>
										</Col>
										<Col flex={0}>
											<IconText icon={LuEye} text={23} />
										</Col>
										<Col flex={0}>
											<IconText icon={LuMessagesSquare} text={2} />
										</Col>
									</Row>
								</div>
							</div>
						</div>
					</Badge.Ribbon>
				</Link>
			</div>
		</Col>
	);
};
