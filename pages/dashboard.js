import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import cx from "classnames";
import ButtonPlay from "../components/ButtonPlay";
import Head from "next/head";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setJwt } from "../redux/jwtSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("played1");
    localStorage.removeItem("played2");
    localStorage.removeItem("played3");
    localStorage.removeItem("played4");
    localStorage.removeItem("played5");
    localStorage.removeItem("played6");
    localStorage.removeItem("played7");
    dispatch(setJwt(""));
    navigate.push("/");
  };
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [userPlayed1, setUserPlayed1] = useState();
  const [userPlayed2, setUserPlayed2] = useState();
  const [userPlayed3, setUserPlayed3] = useState();
  const [userPlayed4, setUserPlayed4] = useState();
  const [userPlayed5, setUserPlayed5] = useState();
  const [userPlayed6, setUserPlayed6] = useState();
  const [userPlayed7, setUserPlayed7] = useState();

  useEffect(() => {
    const nameValue = localStorage.getItem("name");
    const idValue = localStorage.getItem("id");
    const played1Value = localStorage.getItem("played1");
    const played2Value = localStorage.getItem("played2");
    const played3Value = localStorage.getItem("played3");
    const played4Value = localStorage.getItem("played4");
    const played5Value = localStorage.getItem("played5");
    const played6Value = localStorage.getItem("played6");
    const played7Value = localStorage.getItem("played7");
    setUsername(nameValue);
    setUserId(idValue);
    setUserPlayed1(played1Value);
    setUserPlayed2(played2Value);
    setUserPlayed3(played3Value);
    setUserPlayed4(played4Value);
    setUserPlayed5(played5Value);
    setUserPlayed6(played6Value);
    setUserPlayed7(played7Value);
  }, [username, userId]);
  return (
    <motion.section
      className=" bg-[url('/asset/bg-db.jpeg')] min-h-screen bg-cover bg-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <Head>
        <title>Game Nation - Dashboard</title>
      </Head>
      <div className='flex text-sm font-semibold justify-between items-center md:px-10'>
        <img
          className='w-[60px] md:w-[100px]'
          src='/asset/logo-gn.png'
          alt='logo'
        />
        <div className='flex gap-[50px] md:ml-[70px] lg:ml-[160px]'>
          <a
            href={"/profile/" + userId}
            className='text-black text-sm md:text-lg'
          >
            Profile
          </a>

          <a href='/leaderboard' className='text-black text-sm md:text-lg'>
            Leaderboard
          </a>
        </div>
        <div className='flex md:mt-4 pr-2 md:pr-0'>
          <p className='absolute invisible text-center font-bold md:mr-3 md:relative md:visible md:text-lg'>
            Welcome, {username}
          </p>
          <button
            onClick={handleLogOut}
            className='relative mr-2 rounded px-1 md:px-3 pb-2 pt-1 overflow-hidden group bg-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300'
          >
            <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
            <span className='relative text-xs md:text-lg'>Log Out</span>
          </button>
        </div>
      </div>
      <div className='flex flex-col '>
        <p className='text-center font-bold mt-5 md:invisible'>
          Welcome, {username}
        </p>
        <div className='flex flex-col items-center'>
          <img
            className=' w-[330px]  mt-5 mx-auto md:hidden'
            src='/asset/animate-rps-mobile.gif'
            alt='main'
          />
          <img
            className='invisible md:visible w-[700px]'
            src='/asset/animate-rps.gif'
            alt='main'
          />
          <div className='absolute ml-[-30px] mt-[190px] md:mt-[190px] md:ml-[-360px]'>
            <h2 className=' font-semibold text-white md:text-xl '>
              Rock, Paper, Scissor!
            </h2>
            <p className='text-xs md:text-sm text-white'>
              One of the most popular traditional game.
              <br />
              Play now and show your best in
              <br />
              our leaderboard!
            </p>
            <ButtonPlay
              addClass='md:py-3'
              isPlayed={userPlayed1}
              nameGame='rps'
              id={userId}
            />
          </div>
        </div>

        <div className='flex flex-col mt-[-130px] md:items-center md:mt-[20px]'>
          <h2 className='text-white text-center font-bold md:text-xl '>
            Upcoming Games
          </h2>
          <div className=' mt-[20px]  overflow-auto md:overflow-hidden'>
            <div className=' relative flex item-center gap-6'>
              <div
                className={cx([
                  styles.gtn,
                  "hover:scale-105 ease-in-out duration-300",
                ])}
              >
                <p className='font-bold text-2xl text-center w-[100px]'>
                  <ButtonPlay
                    isPlayed={userPlayed3}
                    nameGame='gtn'
                    id={userId}
                  />
                </p>
              </div>
              <div
                className={cx([
                  styles.pacman,
                  "hover:scale-105 ease-in-out duration-300",
                ])}
              >
                <p className='font-bold text-2xl text-center w-[100px]'>
                  <ButtonPlay
                    isPlayed={userPlayed2}
                    nameGame='pacman'
                    id={userId}
                  />
                </p>
              </div>

              <div
                className={cx([
                  styles.sinvader,
                  "hover:scale-105 ease-in-out duration-300",
                ])}
              >
                <p className='font-bold text-2xl text-center w-[100px]'>
                  <ButtonPlay
                    isPlayed={userPlayed4}
                    nameGame='sinvader'
                    id={userId}
                  />
                </p>
              </div>

              <div
                className={cx([
                  styles.punchout,
                  "hover:scale-105 ease-in-out duration-300",
                ])}
              >
                <p className='font-bold text-2xl text-center w-[100px]'>
                  <ButtonPlay
                    isPlayed={userPlayed5}
                    nameGame='punchout'
                    id={userId}
                  />
                </p>
              </div>

              <div
                className={cx([
                  styles.outrun,
                  "hover:scale-105 ease-in-out duration-300",
                ])}
              >
                <p className='font-bold text-2xl text-center w-[100px]'>
                  <ButtonPlay
                    isPlayed={userPlayed6}
                    nameGame='outrun'
                    id={userId}
                  />
                </p>
              </div>

              <div
                className={cx([
                  styles.cadillacs,
                  "hover:scale-105 ease-in-out duration-300",
                ])}
              >
                <p className='font-bold text-2xl text-center w-[100px]'>
                  <ButtonPlay
                    isPlayed={userPlayed7}
                    nameGame='cadillacs'
                    id={userId}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Dashboard;
