import { useState } from "react";
import SearchLocation from "./SearchLocation";

function SideBar({temprature}) {

  return (
    <div className="flex flex-col min-h-screen bg-darkblue w-full lg:w-1/3 xl:w-1/4 p-7 lg:p-4 xl:p-7 space-y-10 overflow-x-hidden">
        <>
          <div className="flex justify-between mb-10 space-x-4">
          <input
          type="text"
          className="border rounded-lg border-gray-150 bg-transparent p-3 flex-grow"
          placeholder="search location"
        />
        <button className="bg-[#3C47E9] rounded-lg py-3 px-5 hover:bg-[#3C47E9]/70">
          Search
        </button>
          </div>

          <div className="relative -mx-36 flex justify-center items-center max-h-40">
            <img
              src="/images/Cloud-background.png"
              alt="bg"
              className="opacity-10 absolute max-w-52"
            />
            <img src="/images/Shower.png" alt="weather" className="max-h-48" />
          </div>

          <div className="flex flex-col items-center justify-between flex-grow pt-6">
            <h1 className="text-gray-150 text-[100px] font-medium">
              {temprature}<span className="text-5xl text-gray-250">&deg;C</span>
            </h1>
            <h3 className="font-semibold text-4xl text-gray-250">Shower</h3>
            <div className="flex flex-col items-center text-center text-gray-350 text-lg space-y-5">
              <p>Today &bull; Fri 5 Jun</p>
              <p>
                <i className="fas fa-map-marker-alt"></i> Helsinki
              </p>
            </div>
          </div>
        </>
    </div>
  );
};

export default SideBar;
