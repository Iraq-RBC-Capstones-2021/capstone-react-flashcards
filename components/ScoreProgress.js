import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ScoreProgress = ({
  number = "20",
  color = "#FF886C",
  title = "Loading",
  trailColor = "#FBEDE6",
}) => {
  return (
    <div className="flex flex-col lg:w-44 md:w-48 sm:w-50 w-52 m-2 font-bold">
      <CircularProgressbar
        value={number}
        text={number}
        strokeWidth="10"
        styles={buildStyles({
          textColor: "#000",
          pathColor: `${color}`,
          trailColor: `${trailColor}`,
          textSize: "24px",
          strokeLinecap: "butt",
        })}
        counterClockwise
      />
      <div className="self-center mt-1">
        <h1 className="text-2xl lg:text-2xl md:text-4xl">{title}</h1>
      </div>
    </div>
  );
};
