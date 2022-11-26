import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import cx from "classnames";

const Dashboard = () => {
  const navigate = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate.push("/");
  };
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const nameValue = localStorage.getItem("name");
    const idValue = localStorage.getItem("id");
    setUsername(nameValue);
    setUserId(idValue);

    console.log(username, userId);
  }, [username, userId]);
  return (
    <section className=" bg-[url('/asset/bg-db.jpeg')] min-h-screen bg-cover bg-center">
      <div className="flex text-sm font-semibold justify-between items-center md:px-10">
        <img className="w-[60px] md:w-[100px]" src="/asset/logo-gn.png" alt="logo" />
        <div className="flex gap-[50px] md:">
          <a href={"/profile/" + userId} className="text-black text-sm md:text-lg">
            Profile
          </a>

          <a href="/leaderboard" className="text-black text-sm md:text-lg">
            Leaderboard
          </a>
        </div>
        <div className="flex md:mt-4">
          <p className="absolute invisible text-center font-bold md:relative md:visible md:text-lg pr-4">Welcome, {username}</p>
          <button
            onClick={handleLogOut}
            className="relative mr-2 rounded px-1 md:px-3 pb-2 overflow-hidden group bg-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative text-xs md:text-lg">Log Out</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col ">
        <p className="text-center font-bold mt-5 md:invisible">Welcome, {username}</p>
        <div className="flex flex-col items-center">
          <img className=" w-[330px]  mt-5 mx-auto md:hidden" src="/asset/animate-rps-mobile.gif" alt="main" />
          <img className="invisible md:visible w-[700px]" src="/asset/animate-rps.gif" alt="main" />
          <div className="absolute ml-[-30px] mt-[190px] md:mt-[190px] md:ml-[-360px]">
            <h2 className=" font-semibold text-white md:text-xl ">Rock, Paper, Scissor!</h2>
            <p className="text-xs md:text-sm text-white">
              One of the most popular traditional game.
              <br />
              Play now and show your best in
              <br />
              our leaderboard!
            </p>
            <a href={"/game/" + userId}>
              <button className="relative inline-block mt-2 px-4 py-1 font-semibold group md:px-6 md:py-2 ">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <h1 className="relative text-center text-[12px] md:text-base text-black group-hover:text-white">Play</h1>
              </button>
            </a>
          </div>
        </div>

        <div className="flex flex-col mt-[-130px] md:items-center md:mt-[20px]">
          <h2 className="text-white text-center font-bold md:text-xl ">Upcoming Games</h2>
          <div className="overflow-x-auto mt-[20px]">
            <div className=" relative flex item-center gap-6">
              <div className={cx([styles.pacman, "hover:scale-105 ease-in-out duration-300"])}>
                <p className="font-bold text-2xl text-center ">
                  Coming
                  <br />
                  Soon
                </p>
              </div>

              <div className={cx([styles.sinvader, "hover:scale-105 ease-in-out duration-300"])}>
                <p className="font-bold text-2xl text-center ">
                  Coming
                  <br />
                  Soon
                </p>
              </div>

              <div className={cx([styles.plane, "hover:scale-105 ease-in-out duration-300"])}>
                <p className="font-bold text-2xl text-center ">
                  Coming
                  <br />
                  Soon
                </p>
              </div>

              <div className={cx([styles.punchout, "hover:scale-105 ease-in-out duration-300"])}>
                <p className="font-bold text-2xl text-center ">
                  Coming
                  <br />
                  Soon
                </p>
              </div>

              <div className={cx([styles.outrun, "hover:scale-105 ease-in-out duration-300"])}>
                <p className="font-bold text-2xl text-center ">
                  Coming
                  <br />
                  Soon
                </p>
              </div>

              <div className={cx([styles.cadillacs, "hover:scale-105 ease-in-out duration-300"])}>
                <p className="font-bold text-2xl text-center ">
                  Coming
                  <br />
                  Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
