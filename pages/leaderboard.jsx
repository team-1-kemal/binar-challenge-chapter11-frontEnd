import React from 'react';
import Head from 'next/head';
import Datauser from '../components/datauser';
import { Leaderboard } from '../components/database';

function sortUser(data) {
  return data.sort((a, b) => {
    if (a.score === b.score);
    return b.score - a.score;
  });
}

function Board() {
  return (
    <section className="board-main min-h-screen bg-cover bg-center bg-[url('/asset/bg-leaderboard.png')]">
      <Head>
        <title>Game Nation - Leaderboard</title>
        <meta name="description" content="Leaderboard Page" />
      </Head>
      <a href="/dashboard">
        <div className="absolute inline-block text-sm md:text-lg group mt-5 ml-1 lg:ml-5">
          <span className="relative z-10 block px-1 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50" />
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease" />
            <span className="relative">Home</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          />
        </div>
      </a>
      <div className=" justify-center text-center">
        <br />
        <img
          src="/asset/logo-game.png"
          alt="logo"
          className=" w-[60px] md:w-[120px] absolute right-2"
        />
        <h1 className="leaderboard board-title text-2xl  font-semibold">
          Leaderboard
        </h1>

        <div className="duration all-time">
          <div
            data-id="0"
            className="button mr-5 w-28 mt-5 ml-3 relative inline-block px-4 py-2 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black " />
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black " />
            <span className="relative text-black text-lg ">All-Time</span>
          </div>
        </div>

        <Datauser Leaderboard={sortUser(Leaderboard)} />
      </div>
    </section>
  );
}

export default Board;
