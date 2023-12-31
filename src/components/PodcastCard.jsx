import { Button } from "flowbite-react";
import ClockIcon from "../components/Icons/ClockIcon";
import PodcastCalendar from "../components/Icons/PodcastCalendar";
import MegaphoneIcon from "../components/Icons/MegaphoneIcon";
import { Timestamp } from "firebase/firestore";

const formatDate = (date) => {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join("/");
};

const convertSeconds = (date) => {
  return new Date(date._seconds * 1000);
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

const PodcastCard = ({ podcast, playAudio, shadowColor, showDetails }) => {
  const pcDate =
    podcast.date instanceof Timestamp
      ? podcast.date.toDate()
      : podcast.date._seconds
      ? convertSeconds(podcast.date)
      : new Date(podcast.date);

  return (
    <div
      className={`speaker-div snap-center w-fit my-4 flex flex-col items-center bg-white rounded-lg shadow-lg shadow-${shadowColor} md:flex-row md:max-w-xl hover:scale-105 hover:shadow-${shadowColor} hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
    >
      <img
        className="lg:rounded-l-lg md:rounded-l-lg lg:rounded-r-none md:rounded-r-none rounded-t-lg h-fit"
        src={podcast.speaker.img}
        alt=""
      />
      <div className="flex flex-col h-full justify-between p-4 leading-normal">
        <h5 className="mb-2 text-md font-bold max-w-[16ch] tracking-tight text-gray-900 dark:text-white">
          {podcast.title}
        </h5>
        <div className="flex-col w-full mb-3 text-xs text-gray-700 dark:text-gray-400">
          <div className="flex w-fit gap-2 items-center">
            <ClockIcon />
            <p className="text-black">{podcast.duration}</p>
          </div>
          <div className="flex w-fit gap-2 items-center text-black">
            <PodcastCalendar />
            <p className="text-black">{formatDate(pcDate)}</p>
          </div>

          <div className="flex w-fit gap-2 items-center text-black">
            <MegaphoneIcon />
            <p className="min-w-[15 ch] text-black">{podcast.speaker.name}</p>
          </div>
        </div>
        <div className="flex-col justify-stretch">
          <div className="flex w-full gap-4">
            <Button
              className="bg-app_accent-900 w-full"
              size="xs"
              onClick={() => {
                playAudio(podcast);
              }}
            >
              Listen
            </Button>

            <Button
              className="bg-app_accent-900 w-full"
              size="xs"
              onClick={() => showDetails(podcast)}
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
