export default function Home() {
  return (
    <section className="min-h-screen bg-[url('/asset/bg-home.png')] bg-cover">
      <div className="">
        <br />
        <div className="flex flex-col lg:mt-[-120px] justify-center items-center mx-auto min-h-screen">
          <img
            src="/asset/logo-gn.png"
            alt="Logo"
            className="absolute w-28 mt-[-340px] lg:w-[150px] lg:mt-[-180px]"
          />
          <div className="flex flex-col items-center lg:flex-row ] lg:gap-[80px] 2xl:gap-40 ">
            <div className="flex flex-col my-auto lg:max-w-lg  ">
              <h1 className="text-4xl text-center max-w-xs pt-5 lg:text-left lg:text-8xl font-bold">
                Let the fun begin!
              </h1>
              <h4 className="p-2 text-center max-w-xs md:text-xl lg:text-left lg:ml-[-5px] lg:mt-4 lg:text-2xl">
                Play our games and show your skills to the world!
              </h4>
            </div>
            <img
              className="w-[300px] mt-[-20px] lg:w-[450px] lg:pt-[140px] "
              src="/asset/gameboy.png"
              alt="gameboy pic"
            />
          </div>
          <div className="flex flex-col mt-[-40px] gap-7 max-w-[150px] lg:flex-row lg:ml-[-700px] lg:mt-[-150px] 2xl:ml-[-780px]">
            <a
              href="/login"
              class="relative inline-block px-6 py-2 font-semibold group lg:px-8 lg:py-4 cursor-pointer"
            >
              <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span class="absolute inset-0 w-full h-full bg-red-400 border-2 border-black group-hover:bg-black"></span>
              <h1 class="relative text-center lg:text-xl text-white group-hover:text-white">
                Login
              </h1>
            </a>

            <a
              href="/register"
              class="relative inline-block px-4 py-2 font-semibold group lg:px-6 lg:py-4 cursor-pointer"
            >
              <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span class="absolute inset-0 w-full h-full bg-blue-400 border-2 border-black group-hover:bg-black"></span>
              <h1 class="relative text-center lg:text-xl text-white group-hover:text-white">
                Register
              </h1>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
