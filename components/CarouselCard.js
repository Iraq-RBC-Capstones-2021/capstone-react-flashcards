import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import Player from "./AudioPlayer";

function CarouselCard({
  flashcard = { text: "", images: [], audio: [] },
  carouselEditor,
}) {
  let hasAudio = flashcard.audio && flashcard.audio.length > 0;
  const SSR = typeof window === "undefined";

  const editor = useEditor({
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
    content: flashcard.text,
    editable: false,
  });

  return (
    <div className="container h-96 p-4 flex flex-col gap-5 shadow-md rounded-xl text-center  overflow-y-auto">
      {/* text */}
      {carouselEditor ? (
        <EditorContent editor={carouselEditor} />
      ) : (
        <EditorContent editor={editor} />
      )}

      {/* image */}
      <div className="flex items-center justify-center flex-wrap gap-1 ">
        {flashcard.images
          ? flashcard.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="w-48 h-48 object-contain border border-gray rounded-xl p-2"
              />
            ))
          : null}
      </div>

      {/* audio */}
      <div className="flex justify-center items-center">
        {hasAudio && (
          <div className="flex items-center justify-center gap-1 border border-black rounded-lg overflow-hidden ">
            {flashcard.audio
              ? flashcard.audio.map((file) => (
                  <button
                    key={file}
                    className="group hover:bg-primary active:bg-primary p-1 transition-all duration-150"
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {!SSR ? <Player url={file} /> : null}
                  </button>
                ))
              : null}
          </div>
        )}
      </div>
    </div>
  );
}
export default CarouselCard;
