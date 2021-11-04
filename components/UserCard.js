import Avatar from "../public/assets/Avatar.svg";
import Image from "next/image";

export default function UserCard(props) {
  const {
    title = "Name, occupation",
    description = "Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.",
    imageUrl,
  } = props;
  return (
    <div className="text-black" style={{ width: "350px" }}>
      <div className="text-center p-5">
        <Image
          src={imageUrl ? imageUrl : Avatar}
          alt="user"
          width="100"
          height="100"
          className="rounded-full"
        />

        <h5 className="text-xl font-medium mb-2 mt-8 h-8 overflow-hidden">
          {title}
        </h5>

        <p className="text-lg text-black text-opacity-60 mb-4 h-20 overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
}
