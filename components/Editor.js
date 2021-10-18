import { EditorContent } from "@tiptap/react";

import EditorOption from "./EditorOption";
import codeSvg from "../public/assets/text--code.svg";
import imageSvg from "../public/assets/text-image.svg";
import audioSvg from "../public/assets/text--audio.svg";
import boldSvg from "../public/assets/text--bold.svg";
import italicSvg from "../public/assets/text--italic.svg";
import underlineSvg from "../public/assets/text--underline.svg";
import strikeSvg from "../public/assets/text--strikethrough.svg";
import headingSvg from "../public/assets/text--heading.svg";
import undoSvg from "../public/assets/text--undo.svg";
import redoSvg from "../public/assets/text--redo.svg";

export default function Editor({ editor }) {
  if (!editor) return null;

  return (
    <div>
      <div className="flex w-96 items-center  rounded-tl-2xl border-t-2 border-l-2 border-r-2 overflow-hidden">
        <EditorOption
          isActive={editor.isActive("heading")}
          icon={headingSvg}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <EditorOption
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={boldSvg}
        />
        <EditorOption
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={italicSvg}
        />
        <EditorOption
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={underlineSvg}
        />
        <EditorOption
          isActive={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
          icon={codeSvg}
        />
        <EditorOption
          isActive={editor.isActive("strike")}
          icon={strikeSvg}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <EditorOption
          icon={undoSvg}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <EditorOption
          icon={redoSvg}
          onClick={() => editor.chain().focus().redo().run()}
        />
        <div className="px-1 flex items-center">
          <input
            className="color-input"
            type="color"
            value={editor.getAttributes("textStyle").color || "#000000"}
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
          />
        </div>
        <EditorOption icon={imageSvg} />
        <EditorOption icon={audioSvg} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
