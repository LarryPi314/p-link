import React from 'react';

// interface structure depends on backend, redefined in sidebar.tsx also cuz im not supposed to statically import it or whatever
export interface PastSearch {
  id: number;
  position?: string;
  school?: string;
  location?: string;
  company?: string;
}

interface PastSearchesProps {
  pastSearches: PastSearch[];
  onButtonClick: (query: string) => void; // Function to handle search click
}
const PastSearches: React.FC<PastSearchesProps> = ({ pastSearches, onButtonClick }) => {
    const handleButtonClick = (query: string) => {
      // Call the onSearchClick function with the search query when a past search is clicked
      onButtonClick(query);
    };

/** 
 * 
 * possible way to constrain the properties
 * 
interface PastSearch {
    id: number;
    query: string;
    timestamp: number;
    category?: string;
    userId: number | null;
}

// Custom type guard function to ensure either userId or category exists if one is null
function isValidPastSearch(pastSearch: PastSearch): pastSearch is Required<PastSearch> {
    return (pastSearch.userId !== null && pastSearch.category !== undefined) ||
           (pastSearch.category !== null && pastSearch.userId !== undefined);
}
*/

const searchString = (search: PastSearch): string => {
    if (search.school && search.location && search.company) {
      return `${search.position} at ${search.school} in ${search.location} with ${search.company}`;
    } else if (search.school && !search.location && search.company) {
      return `${search.position} at ${search.school} with ${search.company}`;
    } else if (!search.school && search.location && search.company) {
      return `${search.position} in ${search.location} with ${search.company}`;
    } else if (!search.school && search.location && !search.company) {
      return `${search.position} in ${search.location}`;
    } else if (!search.school && !search.location && search.company) {
      return `${search.position} with ${search.company}`;
    } else {
      return ''; // Return an empty string if none of the conditions are met
    }
  };

  return (
    <div className="past-searches">
      <ul className="text-black">
        {pastSearches.map((search) => (
          <li key={search.id}>
            <button onClick={() => handleButtonClick(searchString(search))}>{searchString(search)}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastSearches;