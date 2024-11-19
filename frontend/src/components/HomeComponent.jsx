import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      toast.success(dataResponse.message);
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log(allUsers);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">User Details</h1>
       <div className="flex items-center justify-between text-lg font-medium text-gray-600">
          <span className="text-gray-800">ProfileImage:</span>
           <img src={allUsers?.Profile_Picture} className='w-10 h-10 rounded-full' alt={allUsers?.First_Name} />
        </div>
     
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between text-lg font-medium text-gray-600">
          <span className="text-gray-800">Username:</span>
          <span className="font-normal">{`${allUsers?.First_Name} ${allUsers?.Last_Name}`}</span>
        </div>

        <div className="flex items-center justify-between text-lg font-medium text-gray-600">
          <span className="text-gray-800">Email:</span>
          <span className="font-normal">{allUsers?.Email || "Null"}</span>
        </div>

        <div className="flex items-center justify-between text-lg font-medium text-gray-600">
          <span className="text-gray-800">Birthdate:</span>
          <span className="font-normal">{allUsers?.Birthdate || 'NULL'}</span>
        </div>

        <div className="flex items-center justify-between text-lg font-medium text-gray-600">
          <span className="text-gray-800">Phone No:</span>
          <span className="font-normal">{allUsers?.Phone_Number || 'NULL'}</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-105 transition-all mx-auto"
          to={'/Operation'}
         >
          Start game
        </Link>
      </div>
    </div>
  );
};

export default HomeComponent;

