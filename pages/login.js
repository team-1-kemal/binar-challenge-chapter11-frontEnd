import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "./api/axios";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const router = useRouter();
  const redirect = () => router.push("/dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    const dataLogin = {
      email,
      password,
    };

    try {
      const response = await axios.post("/auth/login", dataLogin);
      localStorage.setItem("name", response.data.data.fullName);
      localStorage.setItem("id", response.data.data.userId);
      localStorage.setItem("token", response.data.data.token);

      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      e.preventDefault();
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        redirect()
      ) : (
        <section className="flex bg-[url('/asset/bg-login.png')] justify-center bg-cover min-h-screen">
          <img
            src="/asset/logo-gn.png"
            alt="logo"
            className="absolute w-[150px]"
          />
          <div className="flex lg:mt-[30px]">
            <div className=" flex justify-center items-center">
              <div className="absolute w-[300px] h-[400px] lg:w-[400px] lg:h-[500px] font-medium group">
                <span className="absolute  w-full h-full transform translate-x-1 translate-y-1 bg-black"></span>
                <span className="absolute  w-full h-full bg-slate-400 border-2 border-black "></span>
              </div>
              <div className="absolute mt-[-120px]">
                <p
                  ref={errRef}
                  className={
                    errMsg
                      ? "absolute text-red-800 font-bold text-sm ml-[53px] mt-[330px]  lg:mt-[365px] lg:text-lg lg:ml-[60px]"
                      : "offscreen"
                  }
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <div className="flex flex-col w-[250px] lg:w-[300px] mt-28 lg:mt-[120px]">
                  <h1 className=" text-white text-center text-[20px] lg:text-[28px] lg:mt-[-20px] font-bold">
                    Welcome Agent!
                  </h1>
                  <p className="text-white text-center text-[14px] lg:text-[17px] lg:mb-5">
                    Please enter your details to get
                    <br />
                    sign in to your account
                  </p>
                  <label htmlFor="email" className="text-md text-white">
                    Email :
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-[250px] h-[30px] lg:h-[40px] lg:w-[300px] p-2 rounded"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <label htmlFor="password" className="text-md text-white">
                    Password :
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-[250px] h-[30px] lg:h-[40px] lg:w-[300px] p-2 rounded"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <div className="login_btn-login-comp flex flex-col justify-center items-center">
                    <button
                      onClick={handleSubmit}
                      className="relative inline-block  mt-[50px] px-8 py-2 font-semibold group lg:px-6 lg:py-3 lg:mt-[70px] mb-7 "
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-blue-400 border-2 border-black group-hover:bg-black"></span>
                      <h1 className="relative text-center text-sm lg:text-xl text-white group-hover:text-white">
                        Login
                      </h1>
                    </button>
                    <p className="text-center text-md mt-[-15px]">
                      Need an Account?&nbsp;
                      <span className="line">
                        <a href="/register" className="text-white">
                          Sign Up
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
