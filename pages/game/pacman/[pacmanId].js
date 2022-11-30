import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../api/axios";
import Loader from "react-spinners/PacmanLoader";
import Head from "next/head";
import { useSelector } from "react-redux";

const pacman = () => {
  const tokenJwt = useSelector((state) => state.jwt);
  const router = useRouter();
  const { userId } = router.query;

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [user, setUser] = useState({});
  // const [token, setToken] = useState("");
  const [played, setPlayed] = useState();

  const [hidden, setHidden] = useState("hidden");

  const [point, setPoint] = useState("");

  const homeHandler = (e) => {
    e.preventDefault;
    router.push("/dashboard");
  };

  const scoreHandler = () => {
    const value = Math.floor(Math.random() * 11) * 10;
    setPoint(value);
    setPlayed(localStorage.setItem("played2", true));

    let pointUser = user.point;
    pointUser += value;
    axios
      .put(`/game/${2}/${id}?point=${pointUser}&title=PACMAN`)
      .catch((err) => router.push("/login"));
    setLoading(true);
    setHidden("");
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    // setToken(localStorage.getItem("token"));
    setId(localStorage.getItem("id"));
    if (!router.isReady) return;
    axios
      .get("/game/" + userId, { headers: { Authorization: tokenJwt.tokenJwt} })
      .then((user) => setUser(user.data.data))
      .catch((err) => router.push("/login"));
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Game Nation - Pacman</title>
      </Head>
      <section className="flex justify-center bg-[url('/asset/bg-pacman.png')] min-h-screen bg-cover bg-center">
        <button onClick={homeHandler} className="absolute top-0 left-0">
          <div className="absolute inline-block text-sm group mt-5 ml-5">
            <span className="relative z-10 block px-1 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-400 rounded-lg group-hover:text-gray-800">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-400 group-hover:-rotate-180 ease"></span>
              <span className="relative ">Home</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-600 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </div>
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src="/asset/logo-pacman.png"
            className="h-[80px] w-auto mt-[100px]"
          />
          <button
            onClick={scoreHandler}
            className="relative w-[150px] mt-[20px] inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-white rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-yellow-300 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Generate Score
            </span>
            <span className="relative invisible">Button Text</span>
          </button>
          {loading ? (
            <div className="mt-[50px] mr-[30px]">
              <Loader
                color={"#ffff32"}
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <p className="text-white mt-[60px] ml-[35px]">Loading...</p>
            </div>
          ) : (
            <div>
              <h2
                className={`text-white ${hidden} font-montserrat text-base mt-[40px]`}
              >
                Your Score
              </h2>
              <p className="text-white text-[60px]  font-pressstart">{point}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default pacman;
