import React from "react";

const ButtonPlay = (props) => {
  console.log(props.id);
  return (
    <a href={`/game/${props.nameGame}/` + props.id}>
      <button className="relative inline-block mt-2 px-4 py-1 font-semibold group md:px-6 md:py-2 ">
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <h1 className="relative text-center text-[12px] md:text-base text-black group-hover:text-white">
          Play
        </h1>
      </button>
    </a>
  );
};

export default ButtonPlay;
