import React, { useRef, useState } from "react";
import Image from "next/dist/client/image";

export default function Section({
  title,
  titleDesc,
  titleIcon,
  desc,
  isVideo = false,
  video,
  image,
  children,
  reverse = false,
}) {
  return (
    // Let's divide the component into 2 panes using flex and wrap it on smaller screens
    <div
      className="grid grid-cols-1 md:grid-cols-2 items-center justify-center min-w-min py-4 w-full mx-auto"
      style={{ minWidth: 600, minHeight: 350 }}
    >
      {/* left segment is for title and children */}
      <div className="flex flex-col  items-center  ">
        <div>
          <Title title={title} titleDesc={titleDesc} titleIcon={titleIcon} />
          <p className="my-6 text-sm text-gray-400 max-w-sm">{desc}</p>
          {children}
        </div>
      </div>

      {/* right segment is for image or video */}
      <div className={reverse ? "order-first w-full h-full " : "w-full h-full"}>
        {isVideo ? (
          <WindowPane video={video} />
        ) : (
          <div
            className="w-full h-full bg-right bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
      </div>
    </div>
  );
}

const Title = ({ title, titleDesc, titleIcon }) => {
  return (
    <div className="flex items-center">
      {/* Icon segment */}
      {titleIcon ? (
        <div className="mr-3">
          <Image src={titleIcon} width="38" height="38" alt="Title Icon" />
        </div>
      ) : (
        <></>
      )}
      {/* Title Segment */}
      <div>
        <h2 className={`font-semibold ${titleIcon ? "text-sm" : "text-xl"}`}>
          {title}
        </h2>
        <h3 className="text-gray-400 text-sm">{titleDesc}</h3>
      </div>
    </div>
  );
};

const WindowPane = ({ video }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const playVideo = (e) => {
    setShowVideo(true);
    videoRef.current.src = video;
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-shrink-0 h-6 border-l-2 border-r-2 border-t-2 border-black rounded-t-lg py-1 flex items-center px-2">
        <div className="border-2 border-black rounded-full w-3 h-3 mr-1" />
        <div className="border-2 border-black rounded-full w-3 h-3 mr-1" />
        <div className="border-2 border-black rounded-full w-3 h-3" />
      </div>
      <div
        className="flex-grow border-l-2 border-r-2 border-b-2 border-black rounded-b-lg flex items-center justify-center"
        style={{
          background: `repeating-linear-gradient(
          -55deg,
          #fbede6,
          #fbede6 6px,
          #fff 6px,
          #fff 7px
        )`,
        }}
      >
        <button
          className={`btn-secondary flex items-center ${
            showVideo ? "hidden" : ""
          }`}
          onClick={playVideo}
        >
          <span className="mr-3">Preview</span>
          <Image
            src="/assets/svg/ic_play.svg"
            alt="play video"
            width="18"
            height="18"
          />
        </button>
        <video
          ref={videoRef}
          className={`w-full h-full ${showVideo ? "" : "hidden"}`}
          muted
        />
      </div>
    </div>
  );
};
