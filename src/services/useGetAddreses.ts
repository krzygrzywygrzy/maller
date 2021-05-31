import { useState, useEffect } from "react";
import { DbError, UnauthenticatedError } from "../core/errors/errors";
import Address from "../models/address";
import { auth, db } from "./firebase.config";

/**
 * gets lists of addresses of current signed in user
 *
 * @returns {status, data}; {status} -> status of request, {data} -> data received
 */
const useGetAddresses = () => {
  const [status, setStatus] = useState<string>("idle");
  const [data, setData] = useState<Array<Address>>([]);

  useEffect(() => {
    const get = async () => {
      setStatus("pending");
      try {
        if (auth.currentUser?.uid) {
          const query = await db
            .collection("users")
            .doc(auth.currentUser?.uid)
            .get();

          const data = query.data();
          if (data) {
            if (data.addresses && data.addresses.length > 0)
              setData(data.addresses);
            setStatus("success");
          } else throw DbError;
        } else throw UnauthenticatedError;
      } catch (e) {
        console.log(e);
        setStatus("error");
      }
    };

    get();
  }, []);
  
  return { status, data };
};

const addAddress = async () => {};

export default useGetAddresses;
export { addAddress };
