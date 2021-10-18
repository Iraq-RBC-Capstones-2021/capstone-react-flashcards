import Image from "next/image";

import Editor from "./Editor";
import useCardEditor from "../hooks/useCardEditor";
import reverseSvg from "../public/assets/arrow-left-right.svg";

export default function CardEditors({
  frontContent,
  backContent,
  onContentChange,
  onContentSwitch,
  onSubmit,
  submitTitle = "Create",
}) {
  const frontEditor = useCardEditor(frontContent, {
    onUpdate: ({ editor }) => onContentChange(editor, "front"),
  });

  const backEditor = useCardEditor(backContent, {
    onUpdate: ({ editor }) => onContentChange(editor, "back"),
  });

  const handleSwitch = () => {
    onContentSwitch();
    frontEditor.commands.setContent(backContent);
    backEditor.commands.setContent(frontContent);
  };

  const handleOnPreview = () => {};

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="xl:self-end ">
        <button className="btn-primary w-28" onClick={handleOnPreview}>
          Preview
        </button>
      </div>
      <div className="flex flex-col xl:flex-row items-center gap-5 ">
        <div>
          <h3 className="ml-2 text-xl font-bold">Front</h3>
          <Editor editor={frontEditor} />
        </div>
        <div
          className="mt-10 mb-5 md:m-0 cursor-pointer"
          onClick={handleSwitch}
        >
          <Image src={reverseSvg} width="30" height="30" alt="switch cards" />
          <div className="opacity-0 cursor-default h-0">flip</div>
        </div>
        <div>
          <h3 className="ml-2 text-xl font-bold">Back</h3>
          <Editor editor={backEditor} />
        </div>
      </div>
      <div className="flex items-center justify-center my-10">
        <button className="btn-primary" onClick={onSubmit}>
          {submitTitle}
        </button>
      </div>
    </div>
  );
}
