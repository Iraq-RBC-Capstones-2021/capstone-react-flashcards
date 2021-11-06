import Link from "next/link";
import Image from "next/image";
import Facebook from "../public/assets/Facebook.svg";
import Google from "../public/assets/Google.svg";
import Twitter from "../public/assets/Twitter.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white pt-1 text-grey">
      <div className="container mx-auto px-6 border-t-2">
        <div className="text-center py-6">
          <div className="inline-flex text-black">
            <Link href="https://www.facebook.com">
              <a target="_blank" rel="noopener noreferrer" className="px-4">
                <Image src={Facebook} alt="facebook" width="24" />
              </a>
            </Link>
            <Link href="https://twitter.com">
              <a target="_blank" rel="noopener noreferrer" className="px-4">
                <Image src={Twitter} alt="twitter" width="24" />
              </a>
            </Link>
            <Link href="https://mail.google.com">
              <a target="_blank" rel="noopener noreferrer" className="px-4">
                <Image src={Google} alt="google" width="24" />
              </a>
            </Link>
          </div>

          <div className="flex justify-center py-6 font-medium text-black">
            <div className="inline-flex">
              <Link href="/">
                <a className="px-4">Home</a>
              </Link>
              <Link href="/about">
                <a className="px-4">About</a>
              </Link>
            </div>
          </div>
          <p className="text-sm text-black text-opacity-50 font-medium mb-2">
            ©FlashCard, {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
