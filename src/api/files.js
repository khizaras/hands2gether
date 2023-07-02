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
  const storageRef = ref(storage, "listngs/" + file.name);
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
