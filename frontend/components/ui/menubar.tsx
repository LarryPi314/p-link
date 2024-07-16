import React from 'react';

interface PopupProfileProps {
    profilePicture: string;
    name: string;
    school?: string;
    graduationYear?: string;
    position?: string;
    company?: string;
    location?: string;
    onClose: () => void;
}

const PopupProfile: React.FC<PopupProfileProps> = ({
    profilePicture,
    name,
    school,
    graduationYear,
    position,
    company,
    location,
    onClose,
}) => {

    const handleClick = () => {
        // Handle click action
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <nav className="flex justify-between items-center border-b pb-2 mb-4">
                    <button onClick={onClose} className="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                </nav>
                <div className="flex flex-col items-center">
                    <img src={profilePicture} alt="Profile Picture" className="w-32 h-32 rounded-full mb-4" />
                    <h2 className="font-bold text-2xl mb-2 text-black">{name}</h2>
                    <p className="text-sm mb-1 text-black">{school}, {graduationYear}</p>
                    <p className="text-sm mb-1 text-black">{position} @ {company}</p>
                    <p className="text-sm mb-4 text-black">{location}</p>
                    <textarea className="w-full border border-gray-300 rounded-md p-2 text-black" placeholder="Enter text..."></textarea>
                    <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default PopupProfile;
