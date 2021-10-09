import Facebook from "../public/assets/Facebook.svg";
import Google from "../public/assets/Google.svg";
import Twitter from "../public/assets/Twitter.svg";
import Avatar from "../public/assets/Avatar.svg";
import Link from "next/link";
import Image from "next/image";

export default function UserCard(props) {
  const {
    title = "Name, occupation",
    description = "Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.",
    facebook = "/",
    twitter = "/",
    google = "/",
  } = props;
  return (
    <div className="text-black" style={{ width: "350px" }}>
      <div className="text-center p-5">
        <Image src={Avatar} alt="user" />

        <h5 className="text-xl font-medium mb-2 mt-8 h-8 overflow-hidden">
          {title}
        </h5>

        <p className="text-lg text-black text-opacity-60 mb-4 h-20 overflow-hidden">
          {description}
        </p>

        <div className="inline-flex text-black">
          <Link href={facebook} className="text-black hover:bg-primary">
            <a target="_blank" rel="noopener noreferrer" className="px-4">
              <Image src={Facebook} alt="facebook" width="24" />
            </a>
          </Link>
          <Link href={twitter}>
            <a target="_blank" rel="noopener noreferrer" className="px-4">
              <Image src={Twitter} alt="twitter" width="24" />
            </a>
          </Link>
          <Link href={google}>
            <a target="_blank" rel="noopener noreferrer" className="px-4">
              <Image src={Google} alt="google" width="24" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
