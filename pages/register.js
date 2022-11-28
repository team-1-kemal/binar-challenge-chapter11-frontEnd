import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";
import Head from "next/head";
import Loader from "react-spinners/HashLoader";
import { motion, AnimatePresence } from "framer-motion";

const TEXT_REGEX = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [loading, setLoading] = useState(false);
  const [textBtn, setTextBtn] = useState("Submit");

  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const [dob, setDob] = useState("");
  const [validDob, setValidDob] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   setSuccess(true);
  // }, []);

  useEffect(() => {
    const result = TEXT_REGEX.test(fullName);
    setValidFullName(result);
  }, [fullName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    let result = null;
    if (city === "") {
      result = false;
    } else result = true;
    setValidCity(result);
  }, [city]);

  useEffect(() => {
    let result = null;
    if (dob === "") {
      result = false;
    } else result = true;
    setValidDob(result);
  }, [dob]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 | !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    const dataRegis = {
      fullName,
      email,
      password,
      city,
      dob,
    };

    try {
      const response = await axios.post("/auth/signup", dataRegis);
      console.log(JSON.stringify(response));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTextBtn("Done");
      }, 3000);
      setTimeout(() => {
        setSuccess(true);
      }, 3500);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <motion.section
          className="bg-[url('/asset/bg-register.png')] bg-center my-auto min-h-screen flex flex-col bg-cover items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <Head>
            <title>Game Nation - Register</title>
            <meta name="description" content="Login Page" />
          </Head>
          <div className="flex relative mx-auto my-auto items-center min-h-screen">
            <div className="absolute w-[200px] h-[200px] lg:w-[245px] ml-[-30px] font-medium group">
              <span className="absolute w-full h-full transform translate-x-1 translate-y-1 bg-black"></span>
              <span className="absolute  w-full h-full bg-slate-400 border-2 border-black "></span>
            </div>
            <div className="relative flex flex-col text-center lg:text-xl">
              <h1>Registration Success!</h1>
              <p>
                Please&nbsp;
                <a href="/login" className="text-white">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </motion.section>
      ) : (
        <AnimatePresence>
          <motion.section
            className="bg-[url('/asset/bg-register.png')] bg-center my-auto min-h-screen flex flex-col bg-cover items-center"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 1.75, ease: "easeOut" }}
          >
            <Head>
              <title>Game Nation - Register</title>
              <meta name="description" content="Login Page" />
            </Head>
            <img src="/asset/logo-gn.png" alt="logo" className="w-[150px]" />
            <div className="flex flex-col lg:min-h-[720px] lg:my-auto">
              <p
                ref={errRef}
                className={
                  errMsg
                    ? "reg-errmsg font-bold text-red-600 absolute z-50 text-center ml-[40px] mt-[380px] lg:mt-[275px] lg:ml-[220px]"
                    : "hidden"
                }
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <form onSubmit={handlerSubmit} className="">
                <div className="absolute w-[300px] h-[550px] mt-[-30px] ml-[-25px] lg:w-[650px] lg:h-[500px]  font-medium group">
                  <span className="absolute w-full h-full transform translate-x-1 translate-y-1 bg-black"></span>
                  <span className="absolute  w-full h-full bg-slate-400 border-2 border-black "></span>
                </div>
                <h1 className="relative text-center text-lg font-semibold text-white mb-3 lg:text-2xl lg:mb-10">
                  Create New Agent
                </h1>
                <div className="flex-col flex lg:flex-row lg:gap-10 justify-center items-center ">
                  <div className="relative flex flex-col">
                    <label htmlFor="fullName" className="text-white ">
                      Full Name:
                      <span
                        className={
                          validFullName ? "text-green-400 ml-1" : "hidden"
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validFullName || !fullName
                            ? "hidden "
                            : " text-red-500 ml-1"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px] rounded p-2"
                      name="fullName"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      aria-invalid={validFullName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setFullNameFocus(true)}
                      onBlur={() => setFullNameFocus(false)}
                    />
                    <p
                      id="uidnote"
                      className={
                        fullNameFocus && fullName && !validFullName
                          ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                          : "hidden"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                      Please input your name correctly.
                    </p>
                    <label htmlFor="email" className="text-white">
                      Email:
                      <span
                        className={
                          validEmail ? "text-green-400 ml-1" : "hidden"
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validEmail || !email ? "hidden" : "text-red-500 ml-1"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>

                    <input
                      type="email"
                      id="email"
                      className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px] rounded p-2"
                      name="email"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    />

                    <p
                      id="uidnote"
                      className={
                        emailFocus && email && !validEmail
                          ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                          : "hidden"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />{" "}
                      Please input your email correctly
                    </p>

                    <label htmlFor="city" className="text-white">
                      City:
                      <span
                        className={validCity ? "text-green-400 ml-1" : "hidden"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validCity || !city ? "hidden" : "text-red-500 ml-1"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>

                    <input
                      type="text"
                      id="city"
                      className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px] rounded p-2"
                      name="city"
                      autoComplete="off"
                      onChange={(e) => setCity(e.target.value)}
                      required
                      aria-invalid={validCity ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setCityFocus(true)}
                      onBlur={() => setCityFocus(false)}
                    />
                    <p
                      id="uidnote"
                      className={
                        cityFocus && city && !validCity
                          ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                          : "hidden"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-1" /> 4
                      to 24 characters.
                      <br />
                      Must begin with a letter.
                      <br />
                      Letters, numbers, underscores, hypens allowed.
                    </p>
                  </div>

                  <div className="flex flex-col relative">
                    <label htmlFor="dob" className="text-white">
                      Date of Birth:
                      <span
                        className={validDob ? "text-green-400 ml-1" : "hidden"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validDob || !dob ? "hidden" : "text-red-500 ml-1"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>

                    <input
                      type="date"
                      id="dob"
                      className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px] rounded p-2"
                      name="dob"
                      autoComplete="off"
                      onChange={(e) => setDob(e.target.value)}
                      required
                      aria-invalid={validDob ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setDobFocus(true)}
                      onBlur={() => setDobFocus(false)}
                    />
                    <p
                      id="uidnote"
                      className={
                        dobFocus && dob && !validDob
                          ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                          : "hidden"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-1" /> 4
                      to 24 characters.
                      <br />
                      Must begin with a letter.
                      <br />
                      Letters, numbers, underscores, hypens allowed.
                    </p>

                    <label htmlFor="password" className="text-white">
                      Password:
                      <span
                        className={validPwd ? "text-green-400 ml-1" : "hidden"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validPwd || !password ? "hidden" : "text-red-500 ml-1"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>

                    <input
                      type="password"
                      id="password"
                      className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px] rounded p-2"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd
                          ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                          : "hidden"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />8
                      to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters:
                      <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="percent">%</span>
                    </p>

                    <label htmlFor="confirm_pwd" className="text-white">
                      Confirm Password:
                      <span
                        className={
                          validMatch && matchPwd
                            ? "text-green-400 ml-1"
                            : "hidden"
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validMatch || !matchPwd
                            ? "hidden"
                            : "text-red-500 ml-1"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="password"
                      id="confirm_pwd"
                      className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px] rounded p-2"
                      name="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch
                          ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                          : "hidden"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                      Must match the first password input field.
                    </p>
                  </div>
                </div>
                <div className="absolute flex justify-center lg:ml-[260px]">
                  <button
                    className="absolute inline-block w-[100px] lg:h-[50px] lg:w-[120px] ml-[230px] mt-[50px] px-6 py-2 font-semibold group lg:px-6 lg:py-3 lg:mt-[70px] lg:ml-[70px] mb-7 cursor-pointer"
                    disabled={
                      !validPwd || !validMatch || !validEmail || !validFullName
                        ? true
                        : false
                    }
                  >
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-red-400 border-2 border-black group-hover:bg-black"></span>
                    <h1 className="relative text-sm lg:text-xl text-white group-hover:text-white">
                      {loading ? (
                        <div className="ml-4 lg:ml-6">
                          <Loader
                            color={"#ffff32"}
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      ) : (
                        textBtn
                      )}
                    </h1>
                  </button>
                </div>
                <p className="absolute mt-[100px] ml-[20px] text-center lg:ml-[200px] lg:mt-[140px]">
                  Already registered?&nbsp;
                  <span className="line">
                    <a href="/login" className="text-white">
                      {" "}
                      Sign In
                    </a>
                  </span>
                </p>
              </form>
            </div>
          </motion.section>
        </AnimatePresence>
      )}
    </>
  );
};

export default Register;
