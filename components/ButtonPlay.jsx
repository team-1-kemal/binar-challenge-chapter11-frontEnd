import React from 'react';

function ButtonPlay(props) {
  return (
    <a href={`/game/${props.nameGame}/${props.id}`}>
      <button
        type="button"
        className={`relative inline-block mt-2 px-4 py-1 font-semibold group md:px-2 md:py-1 ${props.addClass}`}
      >
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black" />
        {!props.isPlayed ? (
          <h1 className="relative text-center text-[12px] md:text-base text-black group-hover:text-white">
            Play
          </h1>
        ) : (
          <h1 className="relative text-center text-[12px] text-black group-hover:text-white">
            Play Again
          </h1>
        )}
      </button>
    </a>
  );
}

export default ButtonPlay;
