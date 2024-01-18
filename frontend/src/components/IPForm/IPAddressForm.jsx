/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  insertIPAddress,
  resetNotificationState,
} from "../../reducers/ipAddressSlice";
import MoonLoader from "react-spinners/MoonLoader";
import { Oval } from "react-loader-spinner";
function IPAddressForm() {
  const dispatch = useDispatch();
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const { isLoading, error, message } = useSelector((state) => state.ipAddress);
  const [ipAddress, setIpAddress] = useState("");
  useEffect(() => {
    if (message) toast.success(message);
    else if (error) toast.error(error);

    return () => {
      dispatch(resetNotificationState());
    };
  }, [dispatch, error, message]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(insertIPAddress({ address: ipAddress }));
  };

  return (
    <div className="mt-6 flex items-center justify-center">
      {isLoading ? (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Enter an IP Address</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="border p-2 rounded-lg w-48"
                placeholder="Enter IP Address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default IPAddressForm;
