import { useState, useEffect } from "react";
import HomeHeader from "../models/homeHeader";
import { db } from "./firebase.config";

type header = "main" | "sub";

const useGetHeader = (type: header) => {
  const [status, setStatus] = useState<string>("idle");
  const [data, setData] = useState<HomeHeader>();

  useEffect(() => {
    const get = async () => {
      setStatus("pending");
      try {
        const query = await db.collection("home").doc(type).get();
        const data = query.data();

        setData({ link: data?.link, image: data?.image, title: data?.title });
        setStatus("success");
      } catch (err) {
        //TODO: handle err
        console.log(err);
        setStatus("error");
      }
    };

    get();
  }, [type]);

  return { status, data };
};

export default useGetHeader;
