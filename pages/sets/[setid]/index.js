import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { ScoreProgress } from "../../../components/ScoreProgress";

import one from "../../../public/assets/image_place_holder.png";
import setting from "../../../public/assets/svg/Settings.svg";

export const SetPreview = ({ setPreview }) => {
  return (
    <div>
      <div className="flex flex-col my-20">
        <div className="flex justify-around">
          <h1 className="font-bold text-2xl justify-self-start">
            {" "}
            &#62; Set Name
          </h1>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button>
                <span>
                  <Image src={setting} alt="user icon" height={28} width={28} />
                </span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-violet-500 text-primary"
                            : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>

                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-violet-500 text-primary"
                            : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="flex flex-wrap  justify-center mt-14">
          {/* the progress bar have these props (title,number,color,trailColor) */}
          <ScoreProgress title="To Review" number="30" color="#52C41A" />
          <ScoreProgress title="Learning" number="50" />
          <ScoreProgress title="New" number="20" color="#1890FF" />
        </div>
        <div className="flex justify-center ">
          <button className="btn-primary font-200 my-6 w-28">Study</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    //this is just for testing
    `http://jsonplaceholder.typicode.com/posts/${context.query.setid}`
  );
  const setPreview = await res.json();

  return {
    props: {
      setPreview,
    },
  };
};

export default SetPreview;
