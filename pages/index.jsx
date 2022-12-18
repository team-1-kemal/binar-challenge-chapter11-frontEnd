import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.section
      className="min-h-screen bg-[url('/asset/bg-home.png')] bg-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      <Head>
        <title>Game Nation</title>
        <meta name="description" content="Home Page" />
      </Head>
      <div className="">
        <br />
        <div className="flex flex-col lg:mt-[-120px] justify-center items-center mx-auto min-h-screen">
          <img
            src="/asset/logo-gn.png"
            alt="Logo"
            className="absolute w-28 mt-[-340px] lg:w-[150px] lg:mt-[-180px]"
          />
          <div className="flex flex-col items-center lg:flex-row ] lg:gap-[80px] 2xl:gap-40">
            <motion.div
              className="flex flex-col my-auto lg:max-w-lg"
              initial={{ y: 200, scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              <h1 className="text-4xl text-center max-w-xs pt-5 lg:text-left lg:text-8xl font-bold">
                Let the fun begin!
              </h1>
              <h4 className="p-2 text-center max-w-xs md:text-xl lg:text-left lg:ml-[-5px] lg:mt-4 lg:text-2xl">
                Play our games and show your skills to the world!
              </h4>
            </motion.div>
            <motion.img
              className="w-[300px] mt-[-20px] lg:w-[450px] lg:pt-[140px]"
              src="/asset/gameboy.png"
              alt="gameboy pic"
              animate={{ y: 0, scale: 1 }}
              initial={{ y: -100, scale: 0 }}
              transition={{ delay: 2, type: 'spring' }}
            />
          </div>
          <motion.div
            className="flex flex-col mt-[-40px] gap-7 max-w-[150px] lg:flex-row lg:ml-[-700px] lg:mt-[-150px] 2xl:ml-[-780px]"
            animate={{ x: 0 }}
            initial={{ x: -1800 }}
            transition={{ delay: 3, type: 'spring' }}
          >
            <a
              href="/login"
              className="relative inline-block px-6 py-2 font-semibold group lg:px-8 lg:py-4 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
              <span className="absolute inset-0 w-full h-full bg-red-400 border-2 border-black group-hover:bg-black" />
              <h1 className="relative text-center lg:text-xl text-white group-hover:text-white">
                Login
              </h1>
            </a>

            <a
              href="/register"
              className="relative inline-block px-4 py-2 font-semibold group lg:px-6 lg:py-4 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
              <span className="absolute inset-0 w-full h-full bg-blue-400 border-2 border-black group-hover:bg-black" />
              <h1 className="relative text-center lg:text-xl text-white group-hover:text-white">
                Register
              </h1>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
