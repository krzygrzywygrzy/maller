import { useEffect, useState } from "react";
import Order from "../models/order";
import { auth, db } from "./firebase.config";

/**
 * custom hook that gets list of orders for current authenticated user
 * @returns {data} -> array of orders, {status} -> status of request
 */
const useGetOrders = () => {
  const [status, setStatus] = useState<string>("idle");
  const [data, setData] = useState<Array<Order>>([]);

  useEffect(() => {
    const get = async () => {
      setStatus("pending");

      if (auth.currentUser?.uid) {
        const query = await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .get();
        const data = query.data();

        if (data !== undefined) {
          if (data.orders !== undefined) setData(data.orders);
          setStatus("success");
        } else {
          setStatus("error");
        }
      }
    };

    get();
  }, []);

  return { data, status };
};

export default useGetOrders;
