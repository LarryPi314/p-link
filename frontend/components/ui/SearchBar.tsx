"use client"; // This is a client component cuz I can't use useEffect/useState otherwise
// import NextCors from 'nextjs-cors';
import React, { useEffect, useState } from "react";
// import type { NextApiRequest, NextApiResponse } from 'next';

// import styles from './Sidebar.module.css';

interface SearchBarProps {
  searchText: string;
  onSearchTextUpdate: (text: string) => void;
  setProfiles: Function;
  profiles: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchTextUpdate,
  profiles,
  setProfiles,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTextUpdate(event.target.value); // Call the callback function to update search text
    //console.log(searchText);
    //handleSearch();
  };

  const handleSearch = async (query: string) => {
    const response = await fetch("http://127.0.0.1:5000/query_user", {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    console.log(data);
    setProfiles(data);
    console.log(query);
  };

  return (
    <div className="w-full mb-3 h-16 rounded-lg mr-6">
      <div className="relative flex items-center h-16 w-full rounded-lg bg-white shadow-md overflow-hidden">
        <input
          className="h-full w-full px-4 outline-none text-xl text-gray-800 bg-white rounded-lg text-left placeholder-gray-300 placeholder:font-light"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = (e.target as HTMLInputElement).value;
              onSearchTextUpdate(value);
              handleSearch(value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
          type="text"
          id="search"
          placeholder="Search for 5C alumni..."
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default SearchBar;
