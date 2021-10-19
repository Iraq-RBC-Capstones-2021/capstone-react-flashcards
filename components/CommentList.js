import Image from "next/image";

export default function CommentList(props) {
  const {
    title = "Name, occupation",
    avatar = "/assets/Avatar.svg",
    comment = "Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.a paragraph paragraph is a self-contained unit of text description.",
  } = props;
  return (
    <li
      className="flex p-4 hover:bg-gray-50 cursor-pointer"
      style={{ alignItems: "flex-start" }}
    >
      <Image src={avatar} alt="user" width="50" height="50" />
      <div className="pl-8">
        <p className="font-bold">{title}</p>
        <p
          className="max-h-24 text-black text-opacity-60"
          style={{ maxWidth: "690px", overflowY: "auto" }}
        >
          {comment}
        </p>
      </div>
    </li>
  );
}
