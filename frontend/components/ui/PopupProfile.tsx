import React, { useState } from "react";

interface PopupProfileProps {
  profilePicture?: string;
  first_name?: string;
  last_name?: string;
  school?: string;
  graduationYear?: string;
  position?: string;
  company?: string;
  email?: string;
  major?: string;
  onClose: () => void;
}

const PopupProfile: React.FC<PopupProfileProps> = ({
  profilePicture,
  first_name,
  last_name,
  school,
  graduationYear,
  position,
  company,
  email,
  major,
  onClose,
}) => {
  const [msg, setMsg] = useState("");

  const createMsg = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          school,
          graduationYear,
          position,
          company,
          email,
          major,
        }),
      });
      const data = await response.json();
      setMsg(data.response || "Failed to load message.");
    } catch (error) {
      console.error("Error:", error);
      setMsg("Error loading message.");
    }
  };

  const copyMsg = async () => {
    navigator.clipboard.writeText(msg).then(
      () => console.log("Content copied successfully!"),
      (err) => console.error("Error copying text: ", err)
    );
  };

  const sendEmail = () => {
    const subject = `Coffee Chat?`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(msg)}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-6 max-w-[940px] h-[800px] w-full">
        <nav className="flex justify-between items-center border-b pb-2 mb-4">
          <button onClick={onClose} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 hover:text-gray-600 transition-all duration-300"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </nav>
        <div className="flex flex-col items-center">
          <img
            src={profilePicture}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="font-bold text-lg mb-2 text-black">
            {first_name} {last_name}
          </h2>
          <p className="text-sm mb-1 text-black">
            {school}, {graduationYear}
          </p>
          <p className="text-sm mb-2 text-black">
            {position} @ {company}
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-black"
            placeholder="Enter text..."
            rows={18}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={createMsg}
              className="bg-black hover:bg-black text-white py-2 px-4 rounded-md"
            >
              Generate Message
            </button>
            <button
              onClick={copyMsg}
              className="bg-black hover:black text-white py-2 px-4 rounded-md"
            >
              Copy Message
            </button>
            <button
              onClick={sendEmail}
              className="bg-black hover:bg-black text-white py-2 px-4 rounded-md"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupProfile;
