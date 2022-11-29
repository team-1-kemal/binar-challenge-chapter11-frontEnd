import { useRef, useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "../api/axios";

const TEXT_REGEX = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const Edit = () => {
  const userRef = useRef();
  const errRef = useRef();
  const router = useRouter();
  const { userId } = router.query;

  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const [fullName, setFullName] = useState("");
  const [userValue, setUserValue] = useState({});
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

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    const getId = localStorage.getItem("id");
    setId(getId);
    setToken(tokenValue);
  }, [userId]);

  useEffect(() => {
    userRef.current.focus();
    if (!router.isReady) return;
    axios
      .get("/user/profile/" + userId, { headers: { Authorization: token } })
      .then((user) => {
        setUserValue(user.data.data);
      })
      .catch((err) => console.log(err));
  }, [router.isReady]);

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
    setErrMsg("");
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }

    const data = {
      fullName,
      email,
      city,
      dob,
    };
    console.log(data);
    axios
      .put("/user/profile/" + userId, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        setSuccess(true);
        // router.push("/profile/" + id);
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Edit Profile Failed");
        }
        router.push("/login");
        errRef.current.focus();
      });
  };

  return (
    <>
      {success ? (
        <section className="edit_success flex flex-col justify-center items-center min-h-screen  text-[22px] bg-cover bg-[url('/asset/bg-profile.png')]">
          <Head>
            <title>Game Nation - Edit Profile</title>
          </Head>
          <div className="relative">
            <img src="/asset/box-register.png" alt="box" className="regis_box-success md:w-[400px]" />
            <div className="mt-[-150px] ml-[65px] md:mt-[-180px] md:ml-[100px] flex flex-col items-center absolute">
              <h1>Edit Profile Success!</h1>
              <p>
                Go to your&nbsp;
                <a className="text-white" href={"/profile/" + id}>
                  Profile
                </a>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <Head>
            <title>Game Nation - Edit Profile</title>
            <meta name="description" content="Edit Profile Page" />
          </Head>
          <a href="/profile/:userId">
            <div className="absolute inline-block text-sm group mt-5 ml-5">
              <span className="relative z-10 block px-2 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">Back</span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </div>
          </a>
          <div className="edit-page flex flex-col justify-center items-center min-h-screen text-[15px] bg-[url('/asset/bg-profile.png')] bg-cover ">
            <img src="/asset/logo-gn.png" alt="logo" className="w-[100px] mt-[-90px]" />
            <div data-id="0" className=" w-[300px] h-[450px] md:h-[500px] md:w-[500px]  mx-auto relative  px-4 py-2 flex flex-col items-center font-medium group">
              <span className="absolute inset-0 w-full h-full   translate-x-1 translate-y-1 bg-black "></span>
              <span className="absolute inset-0 w-full h-full bg-slate-600 border-2 border-black "></span>
              <span className="relative text-white text-lg ">
                <div className="">
                  <div className="edit-comp">
                    <p ref={errRef} className={errMsg ? " text-red-600 absolute z-50 text-center ml-[40px] mt-[290px] md:mt-[315px] md:ml-[90px]" : "hidden"} aria-live="assertive">
                      {errMsg}
                    </p>
                    <form className="w-[260px] md:w-[350px] mt-[30px]" onSubmit={handleSubmit}>
                      <h1 className="edit-title text-center font-semibold text-xl">Edit Your Agent</h1>
                      <div className="flex md:ml-8">
                        <div className="relevant text-sm md:text-lg edit-form flex flex-col justify-between w-[350px] mt-[10px]">
                          <label htmlFor="fullName">
                            Full Name:
                            <span className={validFullName ? "text-green-400 ml-1" : "hidden"}>
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validFullName || !fullName ? "hidden" : "text-red-500 ml-1"}>
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            className=" text-black w-[250px] h-[30px] md:w-[280px] md:h-[35px] rounded p-2"
                            name="fullName"
                            ref={userRef}
                            autoComplete="off"
                            placeholder={userValue.full_name || ""}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            aria-invalid={validFullName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setFullNameFocus(true)}
                            onBlur={() => setFullNameFocus(false)}
                          />
                          <p id="uidnote" className={fullNameFocus && fullName && !validFullName ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please input your name correctly.
                          </p>
                          <label htmlFor="email" className="mt-3 md:mt-1">
                            Email:
                            <span className={validEmail ? "text-green-400 ml-1" : "hidden"}>
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validEmail || !email ? "hidden" : "text-red-500 ml-1"}>
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>

                          <input
                            type="email"
                            id="email"
                            className="text-black w-[250px] h-[30px] md:w-[280px] md:h-[35px] rounded p-2"
                            name="email"
                            autoComplete="off"
                            placeholder={userValue.email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                          />

                          <p id="uidnote" className={emailFocus && email && !validEmail ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> Please input your email account correctly
                          </p>

                          <label htmlFor="city" className="mt-3 md:mt-1">
                            City:
                            <span className={validCity ? "text-green-400 ml-1" : "hidden"}>
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validCity || !city ? "hidden" : "text-red-500 ml-1"}>
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>

                          <input
                            type="text"
                            id="city"
                            className="text-black w-[250px] h-[30px] md:w-[280px] md:h-[35px] rounded p-2"
                            name="city"
                            autoComplete="off"
                            placeholder={userValue.city || ""}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            aria-invalid={validCity ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setCityFocus(true)}
                            onBlur={() => setCityFocus(false)}
                          />
                          <p id="uidnote" className={cityFocus && city && !validCity ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hypens allowed.
                          </p>

                          <label htmlFor="dob" className="mt-3 md:mt-1">
                            Date of Birth:
                            <span className={validDob ? "text-green-400 ml-1" : "hidden"}>
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validDob || !dob ? "hidden" : "text-red-500 ml-1"}>
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>

                          <input
                            type="date"
                            id="dob"
                            className="text-black w-[250px] h-[30px] md:w-[280px] md:h-[35px] rounded p-2"
                            name="dob"
                            autoComplete="off"
                            placeholder={userValue.dob || ""}
                            onChange={(e) => setDob(e.target.value)}
                            required
                            aria-invalid={validDob ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setDobFocus(true)}
                            onBlur={() => setDobFocus(false)}
                          />
                          <p id="uidnote" className={dobFocus && dob && !validDob ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hypens allowed.
                          </p>
                        </div>

                        <div className="form"></div>
                      </div>
                      <button disabled={!validEmail || !validFullName ? true : false} className="px-5 py-2.5 relative rounded group font-medium text-white inline-block ml-[80px] md:ml-[125px] mt-[60px]">
                        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-slate-600 from-slate-500"></span>
                        <span className="relative">Submit</span>
                      </button>
                    </form>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Edit;
