import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

const useCarouselEditor = (content) => {
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
            class: "text-2xl",
          },
        },
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: content,
    editable: false,
  });
};

export default useCarouselEditor;
