import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "../api/axios";

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const history = user.GameHistories;

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const getId = localStorage.getItem("id");
    setId(getId);
    setToken(getToken);
  }, [userId]);

  useEffect(() => {
    if (!router.isReady) return;
    console.log(userId);
    axios
      .get("/user/profile/" + userId, { headers: { Authorization: token } })
      .then((user) => {
        setUser(user.data.data);
      })
      .catch((err) => console.log(err));
  }, [router.isReady]);

  return (
    <>
      <a href="/dashboard">
        <div className="absolute inline-block text-sm group mt-5 ml-5">
          <span className="relative z-10 block px-1 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Home</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </div>
      </a>
      <section className=" min-h-screen flex flex-col justify-center bg-[url('/asset/bg-profile.png')] bg-cover">
        <div className="text-center font-bold text-lg mt-10">Profile</div>
        <div className="w-[300px] h-[720px] mx-auto flex flex-col md:w-[600px] ">
          <div data-id="0" className=" w-[300px] h-[290px] md:w-[600px] md:h-[300px] mt-5 relative inline-block px-4 py-2 font-medium group">
            <span className="absolute inset-0 w-full h-full   translate-x-1 translate-y-1 bg-black "></span>
            <span className="absolute inset-0 w-full h-full bg-slate-600 border-2 border-black "></span>
            <span className="relative text-white">
              <div className="text-sm md:text-lg mx-5 md:mx-20 mt-[30px] ">
                <p className=" font-medium">Full Name: {user.full_name}</p>
                <p className=" font-medium mt-4">Email: {user.email}</p>
                <p className=" font-medium mt-4">City: {user.city}</p>
                <p className=" font-medium mt-4">DoB: {user.dob}</p>
              </div>
            </span>
          </div>
          <a href={"/edit/" + id}>
            <button className="absolute inline-block px-2 py-1 ml-[105px] md:ml-[255px] mt-[-70px] group  ">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-black text-sm md:text-md group-hover:text-white">Edit Profile</span>
            </button>
          </a>

          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <h3 className="text-center text-xl mt-2">Game History</h3>
            {!history ? (
              <h3 className="text-center">No Record</h3>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Date
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Point
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {history &&
                    history.map((result, i) => {
                      return (
                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.full_name}
                          </th>
                          <td className="py-4 px-6">{result.gameplay}</td>
                          <td className="py-4 px-6">{user.point}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
