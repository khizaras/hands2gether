import React, { useEffect, useState } from "react";
import "./mylistings.less";
import {
	Avatar,
	Breadcrumb,
	Button,
	List,
	Space,
	Spin,
	Typography,
} from "antd";
import { Link, redirectTo } from "@gatsbyjs/reach-router";
import {
	LuChevronRight,
	LuDelete,
	LuEdit,
	LuEye,
	LuMessageSquare,
	LuStar,
	LuThumbsUp,
	LuUserX,
} from "react-icons/lu";
import { useSelector } from "react-redux";
import { ListingsImageCarousel } from "../homepage";

const UsersListings = () => {
	const listings = useSelector((state) => state.listings);
	const user = useSelector((state) => state.user);

	const [isLoaded, setIsLoaded] = useState(false);
	const [data, setData] = useState([]);
	useEffect(() => {
		if (listings.isLoaded) {
			let mylistings = getMyListings();
			setData(mylistings);
			setIsLoaded(true);
		}
	}, [listings]);

	const getMyListings = () => {
		let result = listings.data.filter(
			(listing) => listing.user.id === user.uid
		);
		return result;
	};

	return (
		<section className="user-my-listings-page">
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
							title: <Link to="/user/myListings">My Listings</Link>,
						},
					]}
				/>
			</div>
			<section className="my-listing-container">
				<div className="my-listing-header">
					<Typography.Title level={2}>My Listings</Typography.Title>
					<Typography.Paragraph>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
					</Typography.Paragraph>
				</div>
				<div className="my-listing-body">
					{isLoaded ? (
						<List
							itemLayout="vertical"
							size="large"
							pagination={{
								onChange: (page) => {
									console.log(page);
								},
								pageSize: 3,
							}}
							dataSource={data}
							renderItem={(listing) => <ListingsListView listing={listing} />}
						/>
					) : (
						<Spin className="spinner" />
					)}
				</div>
			</section>
		</section>
	);
};

export default UsersListings;

export const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);

export const ListingsListView = ({ listing }) => {
	const editLisingHandler = () => {
		try {
			redirectTo("/user/addListings");
		} catch (error) {
			console.error({ error: error.message });
		}
	};

	return (
		<List.Item
			className="my-listings-list-item"
			key={listing.id}
			actions={[
				<IconText icon={LuStar} text="156" key="list-vertical-star-o" />,
				<IconText icon={LuThumbsUp} text="156" key="list-vertical-like-o" />,
				<IconText
					icon={LuMessageSquare}
					text="2"
					key="list-vertical-message"
				/>,
				<Link to="/user/addListings">
					<Button type="link" icon={<LuEye />} size="small">
						Preview
					</Button>
				</Link>,
				<Link to={`/user/editListings/${listing.id}`} state={{ ...listing }}>
					<Button type="link" icon={<LuEdit />} size="small">
						Edit
					</Button>
				</Link>,
				<Button
					onClick={() => editLisingHandler(listing)}
					icon={<LuDelete />}
					danger
					size="small"
				>
					Delete
				</Button>,
			]}
			extra={[<ListingsImageCarousel key={1} listing={listing} />]}
		>
			<List.Item.Meta
				title={
					<Link to={`/listings/${listing.id}`}>
						<Typography.Text strong>{listing.title}</Typography.Text>
					</Link>
				}
				description={
					<Typography.Paragraph
						type="secondary"
						ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
					>
						{listing.description}
					</Typography.Paragraph>
				}
			/>
		</List.Item>
	);
};
