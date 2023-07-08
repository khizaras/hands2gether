import {
	getStorage,
	ref,
	uploadBytesResumable,
	connectStorageEmulator,
	getDownloadURL,
} from "firebase/storage";

const storage = getStorage();
connectStorageEmulator(storage, "localhost", 9199);

export const uploadListingImage = async ({
	onError,
	onSuccess,
	file,
	onProgress,
}) => {
	const storageRef = ref(storage, "listngs/" + generateImageName(file));
	const uploadTask = uploadBytesResumable(storageRef, file);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			onProgress(progress);
		},
		onError,
		async () => {
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
			onSuccess(downloadURL);
		}
	);
};

const generateImageName = (file) => {
	const date = new Date();
	const random = Math.random().toString(36).substring(2);
	const extension = file.name.split(".").pop();
	return `${date.getTime()}-${random}.${extension}`;
};
