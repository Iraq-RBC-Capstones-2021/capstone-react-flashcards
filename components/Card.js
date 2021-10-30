import Image from "next/image";
import Link from "next/link";

import imagePlaceHolder from "../public/assets/image_place_holder.png";
import avatarPlaceHolder from "../public/assets/Avatar.png";
import AddOrRemoveSetButton from "./AddOrRemoveSetButton";
import Tag from "./Tag";

const tempTags = ["English", "Learning", "English", "English"];

const tempDescription =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos,culpa sint! Fuga voluptates quia veniam. Magnam pariatur vel culpa sint! Fuga voluptates quia veniam. Magnam pariatur vel culpa sint! Fuga voluptates quia veniam. Magnam pariatur vel ducimus libero doloribus at vero cum corrupti officia consectetur ducimus libero doloribus at vero cum corrupti officia consectetur ducimus libero doloribus at vero cum corrupti officia consectetur";

export default function Card({
  title = "Top 2k English Words and Senteces",
  userName = "User Name",
  cardCount = "2000",
  imageUrl = imagePlaceHolder,
  avatar = avatarPlaceHolder,
  tags = tempTags,
  description = tempDescription,
  setId,
  userId,
}) {
  return (
    <div
      className="group block relative overflow-hidden rounded-3xl shadow-xl
    lg:m-9 m-4 h-60 w-60  sm:h-72 md:h-80 xl:h-96 sm:w-72 md:w-80 xl:w-96
      "
    >
      <div>
        <Image
          className="rounded-b-3xl"
          src={imageUrl}
          blur="true"
          blurDataURL={imagePlaceHolder}
          alt={`${title}'s cover`}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 z-10 rounded-3xl bg-white
        transform translate-y-full transition duration-300 ease-in-out group-hover:translate-y-0
        "
      >
        <div
          className="relative transform -translate-y-full 
        transition duration-300 ease-in-out  group-hover:translate-y-0 
        bg-white rounded-tl-3xl
        "
        >
          <svg
            className="w-28 h-14 absolute bottom-full -right-12 z-10 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 40 80 c 22 0 40 -22 40 -40 v 40 Z" />
          </svg>

          <div
            className="flex flex-col  px-4 pt-4 pb-1 rounded-tl-3xl
            "
          >
            <Link href={`/sets/${setId}`} passHref>
              <h1
                className={`cursor-pointer text-lg md:text-2xl ${
                  title.length >= 25 ? "group-hover:animate-marquee" : ""
                }  whitespace-nowrap`}
              >
                {title}
              </h1>
            </Link>
            <span className="text-xs md:text-sm font-thin ml-1 mt-1  ">
              {cardCount} Cards
            </span>
            <div className="flex flex-wrap items-center gap-1  my-1 ">
              {tags.map((tag, index) => (
                <Tag key={index} name={tag} />
              ))}
            </div>
          </div>
        </div>
        <div className="card-description flex flex-col  justify-between px-5 pb-2  ">
          <div className="flex justify-center items-center flex-1 mb-1 ">
            <p className="font-light text-sm md:text-base h-15 line-clamp-3">
              {description}
            </p>
          </div>
          <div className="flex justify-around items-center flex-1 my-2">
            <div className="flex items-center gap-2 flex-1">
              <Image
                className="rounded-full"
                objectFit="cover"
                blur="true"
                blurDataURL={avatarPlaceHolder}
                alt={`${userName} avatar `}
                width="50"
                height="50"
                src={avatar}
              />
              <Link href={`/users/${userId}`} passHref>
                <span className="text-xs  md:text-sm cursor-pointer truncate">
                  {userName}
                </span>
              </Link>
            </div>
            <AddOrRemoveSetButton
              className="text-xs md:text-sm"
              setId={setId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
