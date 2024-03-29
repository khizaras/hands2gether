import {
	collection,
	getDocs,
	setDoc,
	doc,
	query,
	where,
} from "firebase/firestore";
import _ from "lodash";
import moment from "moment";
import { db } from "../firebase";

export const addListingsAPI = (value) => {
	return new Promise((resolve, reject) => {
		const extractImageList = (fields) => {
			const images = [];
			fields.forEach((field) => {
				images.push(field.response);
			});
			return images;
		};

		const collectionRef = collection(db, "listings");
		const docRef = doc(collectionRef);
		const id = docRef.id;
		let country = JSON.parse(value?.location?.country);
		delete country.timezones;
		let data = {
			id,
			...value,
			date: moment().valueOf(),
			expiryDate: moment().add(30, "days").valueOf(),
			images:
				(value.listingImages &&
					extractImageList(value.listingImages.fileList)) ||
				[],
			user: {
				id: value.user.uid,
				displayName: value.user.displayName,
				email: value.user.email,
				photoURL: value.user.photoURL,
			},
			location: {
				city: JSON.parse(value.location.city),
				state: JSON.parse(value.location.state),
				country: country,
			},
			settings: {
				isFeatured: false,
				isApproved: false,
				showContact: value?.showContact || false,
				showLocation: value?.showLocation || false,
				allowComments: value?.allowComments || false,
			},
		};
		delete data.listingImages;
		delete data.allowComments;
		delete data.showContact;
		delete data.showLocation;
		delete data.location.country.timezones;

		console.log({ data });
		setDoc(docRef, { ...data })
			.then(() => {
				console.log({ data });
				console.log("Document written with ID: ", id);
				resolve(id);
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
				reject(error);
			});
	});
};

export const getListingsAPI = async () => {
	const querySnapshot = await getDocs(collection(db, "listings"));
	const categories = await getDocs(collection(db, "categories"));
	const filterCategories = (categoryID) => {
		if (!categoryID) return null;
		let category = categories.docs
			.filter((category) => category.id === categoryID)[0]
			.data();

		return {
			id: category._id,
			name: category.name,
			icon: category.icon,
			filters: _(category.fields)
				.map((field) => {
					return field.filter === true ? field.name : null;
				})
				.filter()
				.value(),
			//category.fields.filter((cat) => cat.filter === true)[0].name,
		};
	};

	const listings = [];
	querySnapshot.forEach((doc) => {
		let category = filterCategories(doc.data()?.category || null);
		listings.push({
			...doc.data(),
			id: doc.id,
			category: category,
		});
	});
	return listings;
};

export const getListingsWithFillterAPI = async ({ filter, listings }) => {
	let result = [];
	if (filter.city && filter.state && filter.country) {
		console.log({ filter, listings });
		result = listings.filter((listing) => {
			return (
				listing.location.city.name === filter.city &&
				listing.location.state.isoCode === filter.state &&
				listing.location.country.isoCode === filter.country
			);
		});
	}
	if (filter.category) {
		console.log({ filter, listings });
		result = listings.filter(
			(listing) => listing.category.id === filter.category
		);
	}

	return result;
};

// Function to show summary in location-wise format
export const getListingsSummaryByLocation = async (data) => {
	const summary = {};

	// Iterate through each listing in the data
	data.forEach((listing) => {
		const { city, state, country } = listing.location;
		const locationKey = `${city}, ${state}, ${country}`;

		// Count by location
		if (summary[locationKey]) {
			summary[locationKey]++;
		} else {
			summary[locationKey] = 1;
		}
	});

	return summary;
};

export const getCommentsOfListingAPI = async (listingID) => {
	try {
		const commentsRef = collection(db, "comments");
		const q = query(commentsRef, where("listings", "==", listingID));
		const querySnapshot = await getDocs(q);
		const comments = [];
		querySnapshot.forEach((doc) => {
			comments.push(doc.data());
		});
		return comments;
	} catch (error) {
		console.error(
			`[ERROR][${moment().format("HH:mm:ss")}][getCommentsOfListingAPI]`,
			error
		);
	}
};

export const addCommentAPI = async (comment) => {
	try {
		const commentsRef = collection(db, "comments");
		const docRef = doc(commentsRef);
		const id = docRef.id;
		const data = {
			...comment,
			id,
			date: moment().valueOf(),
		};
		await setDoc(docRef, { ...data });
		return data;
	} catch (error) {
		console.error(
			`[ERROR][${moment().format("HH:mm:ss")}][addCommentAPI]`,
			error
		);
	}
};
