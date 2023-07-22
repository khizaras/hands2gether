import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
import _ from "lodash";
import moment from "moment";

const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8080);

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
		let data = {
			id,
			...value,
			date: moment().valueOf(),
			settings: {
				isFeatured: false,
				isApproved: false,
				showContactDetails: false,
				showLocation: false,
			},
			expiryDate: moment().add(30, "days").valueOf(),
			images:
				(value.foodImage && extractImageList(value.foodImage.fileList)) || [],
			user: {
				id: value.user.uid,
				displayName: value.user.displayName,
				email: value.user.email,
				photoURL: value.user.photoURL,
			},
		};
		delete data.foodImage;
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
    if(!categoryID) return null;
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

