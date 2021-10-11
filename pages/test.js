import Section from "../components/Section";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";

export default function Test(props) {
  return (
    <Section
      title="Main Title"
      titleDesc="Test title desc"
      titleIcon="/assets/svg/ic_star.svg"
      desc="Lorem Ipsum is simply dummy text of the printing and typesetting
      indusnot only five centuries, "
      isVideo={true}
    >
      <div className="flex">
        <div className="text-sm">
          <Image
            src="/assets/svg/ic_star.svg"
            width="32"
            height="32"
            alt="icon"
          />
          <h2>Feature Name</h2>
          <h3>Feature Description</h3>
        </div>
        <div>
          <Link className="text-sm" href="/learnMore">
            Learn More &gt;
          </Link>
        </div>
      </div>
    </Section>
  );
}
