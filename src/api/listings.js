import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
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
    let data = {
      id: null,
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

    const listingsRef = collection(db, "listings");
    addDoc(listingsRef, data)
      .then((docRef) => {
        console.log({ value, data, docRef });
        console.log("Document written with ID: ", docRef.id);
        resolve(docRef.id);
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
    let category = categories.docs
      .filter((category) => category.id === categoryID)[0]
      .data();

    return category;
  };

  const listings = [];
  querySnapshot.forEach((doc) => {
    let category = filterCategories(doc.data().category);
    listings.push({
      ...doc.data(),
      id: doc.id,
      category: {
        id: doc.data().category,
        name: category.name,
        icon: category.icon,
      },
    });
  });
  return listings;
};
