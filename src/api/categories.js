import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
import { LuPizza, LuBook, LuShoppingBag } from "react-icons/lu";
import React from "react";
const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8080);

export const getCategories = async () => {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "categories"))
      .then((querySnapshot) => {
        const categories = [];
        querySnapshot.forEach((doc) => {
          categories.push({
            _id: doc.id,
            ...doc.data(),
          });
        });
        resolve(categories);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateCategoryApi = async (category) => {
  return new Promise((resolve, reject) => {
    const categoryRef = doc(db, "categories", category._id);
    setDoc(categoryRef, category)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createCategoryApi = async (category) => {
  return new Promise((resolve, reject) => {
    const id = doc(collection(db, "categories")).id;
    const categoryRef = collection(db, "categories");
    const data = {
      id,
      _id: id,
      ...category,
      fields: [
        {
          name: "title",
          placeholder: "Enter Title",
          label: "Title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          placeholder: "Enter Description",
          label: "Description",
          type: "textarea",
          required: true,
        },
      ],
    };
    addDoc(categoryRef, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getItemIcon = (icon) => {
  const items = {
    Food: <LuPizza size={60} />,
    Books: <LuBook size={60} />,
    Clothes: <LuShoppingBag size={60} />,
  };
  let result = items[icon];
  console.log({ result, icon });
  return result;
};
