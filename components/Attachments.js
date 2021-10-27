const FileTag = ({ file, onFileClick }) => {
  return (
    <span
      onClick={() => onFileClick(file)}
      className="border pl-1 pr-4  relative rounded-xl flex justify-center items-center border-black text-xs cursor-pointer "
    >
      {file.name}
      <label className="text-xs absolute bottom-1 right-1 cursor-pointer">
        x
      </label>
    </span>
  );
};

export default function Attachments({ front, back, onFileRemove }) {
  return (
    <div className="flex flex-col gap-1 justify-center items-start  mb-5 flex-wrap xl:mb-0">
      <h5 className=" mb-2 text-xl font-semibold">Attachments</h5>
      {front.images.length > 0 || front.audio.length > 0 ? (
        <div className="flex gap-1 flex-warp">
          <span className="font-light">Front : </span>
          {front.images.map((image, index) => (
            <FileTag
              key={index}
              onFileClick={(file) => onFileRemove(file, "front")}
              file={image}
            />
          ))}
          {front.audio.map((audio, index) => (
            <FileTag
              key={index}
              onFileClick={(file) => onFileRemove(file, "front")}
              file={audio}
            />
          ))}
        </div>
      ) : null}
      <div className="flex gap-1 flex-warp">
        {back.images.length > 0 || back.audio.length > 0 ? (
          <div className="flex gap-1 flex-warp">
            <span className="font-light">Back : </span>
            {back.images.map((image, index) => (
              <FileTag
                key={index}
                onFileClick={(file) => onFileRemove(file, "back")}
                file={image}
              />
            ))}
            {back.audio.map((audio, index) => (
              <FileTag
                key={index}
                onFileClick={(file) => onFileRemove(file, "back")}
                file={audio}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
