import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../api/axios";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";

const Game = () => {
  const tokenJwt = useSelector((state) => state.jwt);
  const router = useRouter();
  const { userId } = router.query;

  const [userChoice, setUserChoice] = useState("rock");
  const [comChoice, setComChoice] = useState("rock");
  const [userScore, setUserScore] = useState(0);
  const [comScore, setComScore] = useState(0);
  const [result, setResult] = useState("Lets see who wins");
  const [played, setPlayed] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [user, setUser] = useState({});
  const [id, setId] = useState("");
  // const [token, setToken] = useState("");
  const [confetti, setConfetti] = useState("hidden");
  const control = useAnimation();

  const choice = ["rock", "paper", "scissors"];

  const homeHandler = (e) => {
    e.preventDefault;
    router.push("/dashboard");
  };

  const handleOnClick = (choice) => {
    setUserChoice(choice);
    generateComChoice();
    setPlayed(localStorage.setItem("played1", true));
  };

  const generateComChoice = () => {
    const randomChoice = choice[Math.floor(Math.random() * choice.length)];
    setComChoice(randomChoice);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    // setToken(localStorage.getItem("token"));
    setId(localStorage.getItem("id"));
    if (!router.isReady) return;

    axios
      .get("/game/" + userId, { headers: { Authorization: tokenJwt.tokenJwt } })
      .then((user) => setUser(user.data.data))
      .catch((err) => router.push("/login"));
  }, [router.isReady]);

  useEffect(() => {
    const comboMoves = userChoice + comChoice;
    if (userScore <= 2 && comScore <= 2) {
      if (
        comboMoves === "rockscissors" ||
        comboMoves === "paperrock" ||
        comboMoves === "scissorspaper"
      ) {
        const updatedUserScore = userScore + 1;
        setUserScore(updatedUserScore);
        if (updatedUserScore === 3) {
          setGameOver(true);
          setResult("Win!");
          setConfetti("");
          setBtnDisabled(true);
          control.start({
            scale: [0, 2, 1.5],
            transition: { duration: 1, type: "spring" },
          });
          let pointUser = user.point;
          pointUser += 100;
          axios
            .put(
              `/game/${1}/${id}?point=${pointUser}&title=ROCK PAPER SCISSOR`
            )
            .then((response) => alert("You win!"))
            .catch((err) => router.push("/login"));
        }
      }
      if (
        comboMoves === "paperscissors" ||
        comboMoves === "scissorsrock" ||
        comboMoves === "rockpaper"
      ) {
        const updatedComputerScore = comScore + 1;
        setComScore(updatedComputerScore);
        if (updatedComputerScore === 3) {
          setGameOver(true);
          setResult("Lose!");
          control.start({
            scale: [0, 2, 1.5],
            transition: { duration: 1, type: "spring" },
          });
          setBtnDisabled(true);
        }
      }
      if (
        comboMoves === "rockrock" ||
        comboMoves === "paperpaper" ||
        comboMoves === "scissorsscissors"
      ) {
      }
    }
  }, [userChoice, comChoice]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <Head>
        <title>Game Nation - Rock Paper Scissors!</title>
      </Head>

      <section className="flex bg-[url('/asset/bg-game.png')] flex-col items-center min-h-screen px-[1rem] py-[0.5rem] bg-cover bg-no-repeat bg-center">
        <button onClick={homeHandler} className="absolute top-0 left-0">
          <div className="absolute inline-block text-sm group mt-5 ml-5">
            <span className="relative z-10 block px-1 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative ">Home</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </div>
        </button>
        <img
          src="/asset/confetti.gif"
          className={`${confetti} absolute min-h-screen`}
        />
        <img
          src="/asset/logo-game.png"
          className="w-[100px] md:w-[120px]"
          alt="logo"
        />
        <div className="game_score flex mt-[50px] gap-[70px] md:gap-[350px] lg:gap-[400px] md:mt-[0px]">
          <div>
            <h1 className="text-center font-montserrat text-white text-md md:text-xl text-user-point">
              User Points
            </h1>
            <h5 className="text-center font-pressstart text-white text-xl md:text-3xl user-point">
              {userScore}
            </h5>
          </div>
          <div>
            <h1 className="text-center font-montserrat text-white text-md md:text-xl text-user-point">
              Com Points
            </h1>
            <h5 className="text-center font-pressstart text-white text-xl md:text-3xl user-point">
              {comScore}
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[20px]">
          <div className="flex gap-[20px] md:gap-[200px] lg:gap-[250px]">
            <div className="choice-user transform -scale-x-100">
              <motion.img
                className="user-hand w-[130px] md:w-[250px]"
                alt="choice user"
                src={`/asset/${userChoice}.png`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.75, type: "spring" }}
              />
            </div>
            <div className="choice-com">
              <motion.img
                className="com-hand w-[130px] md:w-[250px]"
                alt="choice com"
                src={`/asset/${comChoice}.png`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.75, type: "spring" }}
              />
            </div>
          </div>

          <div className="game-btn-comp ml-4 mt-[100px] md:mt-[40px]">
            {choice.map((choice, index) => (
              <button
                className="button mr-5 w-[70px] md:w-[120px] relative inline-block px-1 py-1 md:py-2 text-sm md:text-lg group"
                key={index}
                onClick={() => handleOnClick(choice)}
                disabled={btnDisabled}
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">
                  {choice}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            animate={control}
            className="game-result mt-[-90px] md:mt-[-230px]"
          >
            {/* <h1>Turn Result: {turnResult}</h1> */}
            {gameOver && (
              <div>
                <h1 className="text-center font-pressstart text-sm md:text-2xl text-result mt-[-20px]">
                  You
                </h1>
                <h1 className="text-result font-pressstart text-lg md:text-4xl text-center">
                  {result}
                </h1>
              </div>
            )}
          </motion.div>

          <div className="btn-gameover-comp mt-[130px] md:mt-[220px]">
            {gameOver && (
              <button
                className="btn-gameover w-[160px] relative inline-flex items-center justify-center p-1 px-1 py-1 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 bg-slate-700 border-white rounded-full shadow-md group"
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
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full text-sm h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Restart Game
                </span>
                <span className="relative font-montserrat invisible">
                  Restart Game?
                </span>
              </button>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Game;
