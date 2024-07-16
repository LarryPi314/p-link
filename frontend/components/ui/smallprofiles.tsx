import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const PopupProfileDynamic = dynamic(() => import("./PopupProfile"), {
  ssr: false,
});

interface SmallProfileProps {
  company?: string;
  email?: string;
  first_name?: string;
  graduating_year?: string;
  last_name?: string;
  major?: string;
  position?: string;
  school?: string;
}

const SmallProfile: React.FC<SmallProfileProps> = ({
  company,
  email,
  first_name,
  graduating_year,
  last_name,
  major,
  position,
  school,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        setPhotoUrl(data.results[0].picture.large);
      })
      .catch((error) => console.error("Error fetching user image:", error));
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button onClick={togglePopup} className="focus:outline-none w-full">
        <div className="flex justify-between w-full border border-gray-200 p-4 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200 ease-in-out">
          <div className="flex items-center">
            <img
              src={photoUrl || "https://via.placeholder.com/150"}
              alt={`${first_name} ${last_name}`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex flex-col justify-center">
              <p className="text-md text-black mt-1 text-left">
                {first_name} {last_name}
              </p>
              {school && graduating_year && (
                <p className="text-sm text-gray-600 mt-1 text-left">
                  {school}, {graduating_year}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {position && company && (
              <p className="text-sm text-gray-600">
                {position} @ {company}
              </p>
            )}
          </div>
        </div>
      </button>
      {isPopupOpen && (
        <PopupProfileDynamic
          profilePicture={photoUrl}
          first_name={first_name}
          last_name={last_name}
          email={email}
          major={major}
          school={school}
          graduationYear={graduating_year}
          position={position}
          company={company}
          onClose={togglePopup}
        />
      )}
    </div>
  );
};

export default SmallProfile;
