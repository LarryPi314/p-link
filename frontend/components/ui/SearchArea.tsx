"use client";

import React, { useState, useEffect } from "react";
import SmallProfile from "@/components/ui/smallprofiles";
import dynamic from "next/dynamic";

const SearchBarDynamic = dynamic(() => import("./SearchBar"), {
  ssr: false, // Disable server-side rendering for this component
});

interface Profile {
  photo_url?: string;
  company?: string;
  email?: string;
  first_name?: string;
  graduating_year?: string;
  last_name?: string;
  major?: string;
  position?: string;
  school?: string;
}
interface SearchAreaProps {
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchArea: React.FC<SearchAreaProps> = ({
  searchHistory,
  setSearchHistory,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  // const dummyProfiles: Profile[] = [
  //     {
  //         profilePicture: '././twitter-image.png',
  //         name: 'Emma Hanson',
  //         school: 'Pomona',
  //         graduationYear: '2020',
  //         position: 'Associate PM',
  //         company: 'Notion',
  //         location: 'San Francisco, CA'
  //     },
  //     {
  //         profilePicture: '././twitter-image.png',
  //         name: 'Fred Jackson',
  //         school: 'CMC',
  //         graduationYear: '2007',
  //         position: 'Head of Product',
  //         company: 'Spotify',
  //         location: 'Berkeley, CA'
  //     },
  //     {
  //         profilePicture: '././twitter-image.png',
  //         name: 'Eileen Kang',
  //         school: 'Scripps',
  //         graduationYear: '2026',
  //         position: 'Product Manager Intern',
  //         company: 'Intuit',
  //         location: 'Mountain View, CA'
  //     }
  // ];

  // useEffect(() => {
  //     // Simulate a backend query
  //     setProfiles(dummyProfiles);
  // }, []);
  useEffect(() => {
    console.log("profiles modified!");
    console.log(profiles);
  }, [profiles]);

  useEffect(() => {
    if (query !== "Show me something") {
      setSearchHistory((searchHistory) => [...searchHistory, query]);
    }
  }, [query]);

  const handleSearch = () => {
    setSearch(query);
    setQuery("");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white pr-6 pl-6 pt-6">
      <div className="flex justify-between items-center bg-white sticky top-0 z-10 text-gray-400 mb-4">
        <h2>
          {query !== "Show me something"
            ? query.length > 50
              ? `${query.slice(0, 50)}...`
              : query
            : ""}
        </h2>
        <h2>{profiles.length > 0 ? `${profiles.length} results` : ""}</h2>
      </div>
      <div
        className="flex-grow overflow-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="grid grid-flow-row auto-rows-max space-y-4">
          {profiles.map((profile, index) => (
            <SmallProfile key={index} {...profile} />
          ))}
        </div>
      </div>
      <div className="w-full pb-3 pt-3 pr-3">
        <SearchBarDynamic
          profiles={profiles}
          setProfiles={(data: any) => {
            setProfiles(data["profiles"]);
          }}
          searchText={query}
          onSearchTextUpdate={setQuery}
        />
      </div>
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default SearchArea;
