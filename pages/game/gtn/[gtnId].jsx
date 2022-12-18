import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';

const secretNumber = Math.trunc(Math.random() * 20) + 1;

function Gtn() {
  const tokenJwt = useSelector((state) => state.jwt);
  const router = useRouter();
  const { userId } = router.query;

  const [id, setId] = useState('');
  const [user, setUser] = useState({});
  // const [token, setToken] = useState("");
  const [, setPlayed] = useState();
  const [number, setNumber] = useState('?');
  const [guess, setGuess] = useState('');
  const [textResult, setTextResult] = useState('Start Guessing...');
  const [bgcolor, setBgcolor] = useState('bg-black');
  const [score, setScore] = useState(100);
  const [hidden, setHidden] = useState('');
  const [restart, setRestart] = useState('hidden');
  const [confetti, setConfetti] = useState('hidden');
  const control = useAnimation();
  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    // setToken(localStorage.getItem("token"));
    setId(localStorage.getItem('id'));
    if (!router.isReady) return;
    axios
      .get(`/game/${userId}`, { headers: { Authorization: tokenJwt.tokenJwt } })
      .then((userData) => setUser(userData.data.data))
      .catch(() => router.push('/login'));
  }, [router.isReady]);

  const guessHandler = (e) => {
    setGuess(e.target.value);
  };

  const homeHandler = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const checkHandler = () => {
    setPlayed(localStorage.setItem('played3', true));

    if (!guess) {
      setTextResult('⛔️ No Number!');
    } else if (secretNumber === guess) {
      let pointUser = user.point;
      pointUser += score;
      axios
        .put(`/game/${7}/${id}?point=${pointUser}&title=GUESS THE NUMBER`)
        .catch(() => router.push('/login'));
      setNumber(secretNumber);
      control.start({
        scale: [2, 1, 1.5],
        transition: { duration: 0.5, type: 'spring' },
      });
      setBgcolor('bg-green-500');
      setTextResult('🎉 Correct Number!');
      setHidden('hidden');
      setConfetti('');
      setRestart('');
    } else if (guess !== secretNumber) {
      if (score > 10) {
        if (guess > secretNumber) {
          setTextResult('📈 Too high!');
        } else setTextResult('📉 Too low!');
        setScore(score - 10);
      } else {
        setNumber(secretNumber);
        setTextResult('💥 You Lose!');
        setScore(0);
        setBgcolor('bg-red-500');
        setHidden('hidden');
        setRestart('');
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      <Head>
        <title>Game Nation - Guess The Number</title>
      </Head>
      <div
        className={`m-0 flex flex-col items-center justify-center font-pressstart min-h-screen text-white ${bgcolor}`}
      >
        <button
          type="button"
          onClick={homeHandler}
          className="absolute top-0 left-0"
        >
          <div className="absolute inline-block text-sm group mt-5 ml-5">
            <span className="relative z-10 block px-1 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-400 rounded-lg group-hover:text-gray-800">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50" />
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-400 group-hover:-rotate-180 ease" />
              <span className="relative ">Home</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-600 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            />
          </div>
        </button>
        <img
          alt="confetti gif"
          src="/asset/confetti.gif"
          className={`${confetti} absolute min-h-screen`}
        />
        <header className="flex flex-col relative h-[35vh] items-center">
          {/* <h1 className="pt-[60px] text-center text-2xl mb-3">
            Guess The Number!
          </h1> */}
          <motion.img
            src="/asset/logo-gtn.png"
            className="h-[110px] md:h-[220px] md:mt-[-100px] mb-3 w-auto "
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1.75, type: 'spring' }}
          />
          <div className="t-[2rem] r-[2rem] text-xl">(Between 1 and 20)</div>

          <div className="flex flex-col items-center">
            <motion.div
              className="relative text-center text-5xl mt-[55px] py-4 w-[100px] text-slate-800 bg-white"
              animate={control}
            >
              {number}
            </motion.div>
            <div className="bg-white mt-[-40px] w-screen h-[10px]" />
          </div>
        </header>
        <main className="flex flex-col items-center mt-[70px]">
          <section className="text-center left">
            <input
              type="number"
              onChange={guessHandler}
              className="guess w-[140px] text-3xl bg-transparent border-4 border-white p-6 text-center block mb-4"
            />

            <button
              type="submit"
              onClick={checkHandler}
              className={`text-2xl mt-2 ${hidden}`}
            >
              Check!
            </button>
          </section>
          <button
            type="button"
            className={`${restart} btn-gameover font-montserrat w-[160px] relative inline-flex items-center justify-center p-1 px-1 py-1 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 bg-slate-700 border-white rounded-full shadow-md group`}
            onClick={() => reset()}
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
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
                />
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full text-sm h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Restart Game
            </span>
            <span className="relative font-montserrat invisible">
              Restart Game?
            </span>
          </button>
          <section className="mt-[50px] text-center">
            <p className="">{textResult}</p>
            <p className="label-score text-center">
              💯 Score: <span className="score">{score}</span>
            </p>
            {/* <p className="label-highscore">
            🥇 Highscore: <span className="highscore">0</span>
          </p> */}
          </section>
        </main>
      </div>
    </motion.section>
  );
}

export default Gtn;
