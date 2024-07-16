"use client"; // This is a client component cuz I can't use useEffect/useState otherwise

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
// import styles from './Sidebar.module.css'; ?

// Import the component for past searches dynamically
const PastSearchesDynamic = dynamic(() => import("./PastSearches"), {
  ssr: false, // Disable server-side rendering for this component
});
const SearchBarDynamic = dynamic(() => import("./SearchBar"), {
  ssr: false, // Disable server-side rendering for this component
});
const MyProfileDynamic = dynamic(() => import("./myprofile"), {
  ssr: false,
});

interface PastSearch {
  id: number;
  position?: string;
  school?: string;
  location?: string;
  company?: string;
}

interface SideBarProps {
  searchHistory: string[];
}

const SideBar: React.FC<SideBarProps> = ({ searchHistory }) => {
  const [pastSearches, setPastSearches] = useState<PastSearch[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    // Simulate fetching past searches data
    const fetchData = async () => {
      try {
        // Fetch past searches data from an API or local storage
        // For demonstration, we'll use dummy data
        const dummyPastSearches: PastSearch[] = [
          { id: 1, position: "Product Manager", location: "Bay Area" },
          { id: 2, position: "SWE", location: "San Diego" },
          { id: 3, position: "Tech Consultant", location: "NYC" },
          { id: 4, company: "Salesforce", location: "Bay Area" },
          { id: 5, position: "UX Research", school: "Harvey Mudd" },
        ];
        setPastSearches(dummyPastSearches);
      } catch (error) {
        console.error("Error fetching past searches:", error);
      }
    };

    fetchData();
  }, []);

  /** useEffect(() => {
  const fetchData = async () => {
    try {
      const pastSearchesData = await fetchPastSearches(); // Implement this function to fetch past searches data
      setPastSearches(pastSearchesData);
    } catch (error) {
      console.error('Error fetching past searches:', error);
    }
  }; */

  const handleButtonClick = (query: string) => {
    setSearchText(query);
  };
  const handleSearchTextUpdate = (text: string) => {
    setSearchText(text);
  };

  return (
    <div
      className="animate-in h-full gap-5 items-center bg-white text-gray-400 ml-2 pt-6"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <h2 className="ml-3 text-gray-600">Search History</h2>
      {searchHistory.map((query, index) => {
        if (typeof query === "string" && query.trim() !== "") {
          const displayQuery =
            query.length > 37 ? `${query.slice(0, 37)} . . .` : query;
          return (
            <div
              key={index}
              className="bg-white text-gray-600 px-6 py-2 m-2 ml-1 h-12 flex items-center"
              style={{
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <p>{displayQuery}</p>
            </div>
          );
        }
        return null;
      })}
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

export default SideBar;
