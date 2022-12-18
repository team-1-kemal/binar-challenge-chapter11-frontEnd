import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-spinners/HashLoader';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import axios from '../api/axios';

function Profile() {
  const tokenJwt = useSelector((state) => state.jwt);
  const router = useRouter();
  const { profileId } = router.query;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  // const [token, setToken] = useState("");
  const [id, setId] = useState('');
  const history = user.GameHistories;

  useEffect(() => {
    // const getToken = localStorage.getItem("token");
    const getId = localStorage.getItem('id');
    setId(getId);
    // setToken(getToken);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [profileId]);

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`/user/profile/${profileId}`, {
        headers: { Authorization: tokenJwt.tokenJwt },
      })
      .then((userId) => {
        setUser(userId.data.data);
      })
      .catch(() => router.push('/login'));
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Game Nation - Profile</title>
      </Head>
      <a href="/dashboard">
        <div className="absolute inline-block text-sm group mt-5 ml-5">
          <span className="relative z-10 block px-1 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50" />
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease" />
            <span className="relative">Home</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          />
        </div>
      </a>
      <section className=" min-h-screen flex flex-col justify-center bg-[url('/asset/bg-profile.png')] bg-cover">
        {loading ? (
          <div className="flex flex-col items-center ml-[-10px] mt-[-40px]">
            <Loader
              color="#0b1c0f"
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className="text-black font-montserrat font-bold ml-[10px] text-2xl mt-[30px]">
              Loading...
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center font-bold text-lg mt-10">Profile</div>
            <div className="w-[300px] h-[720px] mx-auto flex flex-col md:w-[600px] ">
              <div
                data-id="0"
                className=" w-[300px] h-[290px] md:w-[600px] md:h-[300px] mt-5 relative inline-block px-4 py-2 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full   translate-x-1 translate-y-1 bg-black " />
                <span className="absolute inset-0 w-full h-full bg-slate-600 border-2 border-black " />
                <span className="relative text-white">
                  <div className="text-sm md:text-lg mx-5 md:mx-20 mt-[30px] ">
                    <p className=" font-medium">Full Name: {user.full_name}</p>
                    <p className=" font-medium mt-4">Email: {user.email}</p>
                    <p className=" font-medium mt-4">City: {user.city}</p>
                    <p className=" font-medium mt-4">DoB: {user.dob}</p>
                  </div>
                </span>
              </div>
              <a href={`/edit/${id}`}>
                <button
                  type="submit"
                  className="absolute inline-block px-2 py-1 ml-[105px] md:ml-[255px] mt-[-70px] group  "
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black" />
                  <span className="relative text-black text-sm md:text-md group-hover:text-white">
                    Edit Profile
                  </span>
                </button>
              </a>

              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <h3 className="text-center text-xl mt-2">Game History</h3>
                {!history ? (
                  <h3 className="text-center">No Record</h3>
                ) : (
                  <table className="w-full text-sm text-left text-gray-500 mt-3">
                    <thead className="text-xs uppercase   bg-gray-700  text-gray-400 text-center">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Date
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Game
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {history &&
                        history.map((result) => (
                          <tr
                            key={result.id}
                            className="border-b bg-gray-800 border-gray-700  hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="py-4 px-6 font-medium whitespace-nowrap text-white"
                            >
                              {user.full_name}
                            </th>
                            <td className="py-4 px-6">{result.gameplay}</td>
                            <td className="py-4 px-6">{result.game_title}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Profile;
