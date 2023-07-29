import { Button, Divider, Modal, Select, Typography } from "antd";
import { City, Country, State } from "country-state-city";
import React from "react";
import { ImLocation } from "react-icons/im";
import { useDispatch } from "react-redux";
import { updateCityReducer } from "../../store/reducers/config";
import { useSelector } from "react-redux";

const LocationPickerPopup = ({ address }) => {
	const [open, setOpen] = React.useState(false);
	const config = useSelector((state) => state.config);
	const [location, setLocation] = React.useState({
		country: config.filter.location.country || null,
		state: config.filter.location.state || null,
		city: config.filter.location.city || null,
	});

	const dispatch = useDispatch();
	const changeLocationHandler = (city) => {
		setLocation({ ...location, city: city });
		dispatch(updateCityReducer({ ...location, city: city }));
		setOpen(!open);
	};
	const currentLocationHandler = ({ country, state, city }) => {
		setLocation({ country, state, city });
		dispatch(updateCityReducer({ country, state, city }));
		setOpen(!open);
	};

	return (
		<section>
			<Button
				onClick={() => setOpen(!open)}
				type="default"
				size="large"
				icon={<ImLocation />}
			>
				{location.country && location.state && location.city
					? `${location.city}, ${location.state}, ${location.country}`
					: address
					? `${address.city}, ${address.state}, ${address.country}`
					: "Select Location"}
			</Button>
			<Modal open={open} closable onCancel={() => setOpen(!open)}>
				<Typography.Title level={4}>Change Location</Typography.Title>
				<Select
					autoComplete="none"
					defaultValue={location.country}
					status={location.country ? "success" : "error"}
					showSearch
					style={{ width: "100%", marginTop: 10 }}
					placeholder="Select a Country"
					allowClear
					options={Country.getAllCountries().map((country) => ({
						label: country.name,
						value: country.isoCode,
					}))}
					onChange={(value) => {
						setLocation({ ...location, country: value });
					}}
				/>

				<Select
					autoComplete="none"
					defaultValue={location.state}
					status={location.state ? "success" : "error"}
					showSearch
					style={{ width: "100%", marginTop: 10 }}
					placeholder={
						location.country
							? `Select a State in ${location.country}`
							: "Select a Country First"
					}
					allowClear
					options={State.getStatesOfCountry(location.country).map((state) => ({
						label: state.name,
						value: state.isoCode,
					}))}
					onChange={(value) => {
						setLocation({ ...location, state: value });
					}}
				/>
				<Select
					autoComplete="none"
					defaultValue={location.city}
					showSearch
					style={{ width: "100%", marginTop: 10 }}
					placeholder="Select a City"
					allowClear
					options={City.getCitiesOfState(location.country, location.state).map(
						(city) => ({
							label: city.name,
							value: city.name,
						})
					)}
					onChange={(value) => changeLocationHandler(value)}
				/>
				{address?.city && (
					<div>
						<Divider>OR</Divider>
						<Button
							type="default"
							size="large"
							block
							icon={<ImLocation />}
							onClick={() => {
								let findState = findStateName(
									State.getStatesOfCountry(
										address?.country_code?.toUpperCase()
									),
									address?.state
								);
								console.log({ findState });
								currentLocationHandler({
									country: address?.country_code?.toUpperCase(),
									state: findState,
									city: address.city,
								});
							}}
						>
							{" "}
							{address?.city}, {address?.state} {address?.country}{" "}
						</Button>
					</div>
				)}
			</Modal>
		</section>
	);
};

export default LocationPickerPopup;

// Function to find the state name based on the user input
const findStateName = (data, userInput) => {
	if (!Array.isArray(data) || data.length === 0 || !userInput) {
		return null;
	}

	// Convert userInput to lowercase for case-insensitive comparison
	const userInputLowerCase = userInput.toLowerCase();

	// Find the first state name that matches the user input
	const matchedState = data.find((item) => {
		const stateNameLowerCase = item.name.toLowerCase();
		return stateNameLowerCase === userInputLowerCase;
	});

	console.log({ data, userInput, matchedState });
	return matchedState ? matchedState.isoCode : null;
};
