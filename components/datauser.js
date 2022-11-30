import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../pages/api/axios";

const Datauser = () => {
  const [data, setData] = useState([]);
  const tokenJwt = useSelector((state) => state.jwt);
  // const [token, setToken] = useState('');

  // useEffect(() => {
  //   setToken(localStorage.getItem('token'));
  // });

  useEffect(() => {
    if (!tokenJwt) return;
    axios
      .get("/user/profile/")
      .then((user) => {
        setData(user.data.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [tokenJwt]);
  return (
    <div
      id='data-user'
      className='flex mt-[3em]  gap-[1em] text-left mb-[2em] items-center rounded-[50%] p-[1em] '
    >
      <div className='profile-list p-[20px] rounded-[10px] w-[300px] md:w-[600px] backdrop-blur-md mx-auto'>
        <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
        <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
        <span className='relative text-black group-hover:text-white'>
          {data &&
            data.map((user, i) => (
              <div
                className='flex justify-between md:w-[500px] mx-auto mt-0'
                key={i}
              >
                <div className=' flex items-center text-xs md:text-base'>
                  <div className='w-[200px] md:w-[300px]'>
                    <img
                      className='w-[20%]'
                      src='/asset/logo-user.png'
                      alt='dp'
                    />
                  </div>
                  <div className='info ml-[-150px] md:ml-[-200px]'>
                    <h3 className='name text-dark'>{user.full_name}</h3>
                    <span>{user.city}</span>
                  </div>
                </div>
                <div className='item flex items-center'>
                  <span>{user.point}</span>
                </div>
              </div>
            ))}
        </span>
      </div>
    </div>
  );
};

export default Datauser;
