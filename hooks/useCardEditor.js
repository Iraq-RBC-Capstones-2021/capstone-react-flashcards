import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

const useCardEditor = (content, { ...settings }) => {
  return useEditor({
    extensions: [
      StarterKit.configure({
        code: {
          HTMLAttributes: {
            class: "bg-black text-primary rounded-sm px-2",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "text-xl",
          },
        },
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "w-96 h-64 md:w-128 border-2 border-black p-1 rounded-br-2xl focus-within:border-primary outline-none",
      },
    },
    ...settings,
  });
};

export default useCardEditor;
