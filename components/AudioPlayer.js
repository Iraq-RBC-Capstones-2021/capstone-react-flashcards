import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

const Player = ({
  url = "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
}) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>
        {playing ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H8C9.10457 22 10 21.1046 10 20V4C10 2.89543 9.10457 2 8 2H6ZM16 2C14.8954 2 14 2.89543 14 4V20C14 21.1046 14.8954 22 16 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H16Z"
              fill="#1A1A1A"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 28 28"
            fill="none"
            className="fill-current text-black group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.16675 14.0001C1.16675 21.0877 6.91243 26.8334 14.0001 26.8334C21.0877 26.8334 26.8334 21.0877 26.8334 14.0001C26.8334 6.91243 21.0877 1.16675 14.0001 1.16675C6.91243 1.16675 1.16675 6.91243 1.16675 14.0001ZM11.1871 7.00008C11.3693 7.00008 11.544 7.06845 11.6729 7.19013L19.6322 13.5413C19.9005 13.7947 19.9005 14.2055 19.6322 14.4589L11.6729 20.81C11.4046 21.0634 10.9696 21.0634 10.7013 20.81C10.5725 20.6883 10.5001 20.5233 10.5001 20.3512V7.64896C10.5001 7.29059 10.8077 7.00008 11.1871 7.00008Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Player;
