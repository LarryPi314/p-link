"use client";
import React, { useState } from "react";
import SearchArea from "./SearchArea";
import SideBar from "./SideBar";

const SearchWrapper: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  return (
    <>
      <div className="animate-in w-1/4 opacity-0 h-full">
        <SideBar searchHistory={searchHistory} />
      </div>
      <div className="h-full py-7">
        <div className="w-[0.075rem] bg-[#e0e0e0] h-full "></div>
      </div>
      <div className="animate-in flex-1 flex flex-col gap-5 opacity-0 w-full flex-grow bg-white rounded-lg">
        {/*         <TopBar /> */}
        <SearchArea
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
        />
      </div>
    </>
  );
};

export default SearchWrapper;
