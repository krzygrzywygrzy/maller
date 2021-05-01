import { useState, useEffect } from "react";
import showSnackBar from "../core/functions/snackBar";
import { storage } from "./firebase.config";

const useGetImageUrl = (url: string | undefined) => {
  const [imgUrl, setUrl] = useState<any>("");

  useEffect(() => {
    const get = async () => {
      const storageRef = storage.ref();
      if (url !== undefined)
        storageRef
          .child(url)
          .getDownloadURL()
          .then((img) => {
            setUrl(img);
          })
          .catch(() => {
            showSnackBar("Cannot get image!");
          });
    };

    get();
  }, [url]);

  return imgUrl;
};

export default useGetImageUrl;
