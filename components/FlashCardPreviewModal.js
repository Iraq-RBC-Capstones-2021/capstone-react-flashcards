import FlashCard from "./FlashCard";

export default function FlashCardPreviewModal({ front, back, isOpen, onExit }) {
  const frontContent = {
    ...front,
    images: front.images.map((image) => URL.createObjectURL(image)),
    audio: front.audio.map((audio) => URL.createObjectURL(audio)),
  };

  const backContent = {
    ...back,
    images: back.images.map((image) => URL.createObjectURL(image)),
    audio: back.audio.map((audio) => URL.createObjectURL(audio)),
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center`}
      >
        <div className="relative w-full my-6 mx-auto max-w-7xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
              <h3 className="text-3xl font-light ">Preview</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold
                outline-none focus:outline-none hover:text-primary"
                onClick={onExit}
              >
                <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className="relative flex justify-center items-center mx-36 my-10  ">
              {isOpen ? (
                <FlashCard front={frontContent} back={backContent} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        className={` ${
          isOpen ? "flex" : "hidden"
        } opacity-25 fixed inset-0 z-40 bg-black`}
      ></div>
    </>
  );
}
