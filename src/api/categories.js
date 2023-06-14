import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { LuPizza, LuBook, LuShoppingBag } from "react-icons/lu" 
const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8080);

export const getCategories = async () => {
    return new Promise((resolve, reject) => {
        getDocs(collection(db, "categories")).then((querySnapshot) => {
            const categories = [];
            querySnapshot.forEach((doc) => {
                categories.push(doc.data());
            });
            resolve(categories);
        }).catch((error) => {
            reject(error);
        });
    })
}



export const getItemIcon=(icon)=>{
    const items={
        "Food":<LuPizza size={60} />,
        "Books":<LuBook size={60} />,
        "Clothes":<LuShoppingBag size={60} />

    }
    let result=items[icon];
    console.log({result, icon});
    return result
}