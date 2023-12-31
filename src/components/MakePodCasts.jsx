import { useState, useEffect } from "react";
import { Accordion, Spinner } from "flowbite-react";
import SnapCenterCard from "./SnapCenterCard";
import getAllPodcasts from "../services/getAllPodcasts";

function MakePodCasts(tag, playPodCast, isFeatured) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var pcList = [];
    getAllPodcasts({ exclude: false }).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        pcList = [...pcList, doc.data().podcast];
        setList(pcList);
      });
    });
    setLoading(false);
  }, []);

  const handlePlayPodcast = (audio) => {
    playPodCast(audio);
  };

  if (tag)
    return (
      <Accordion.Content className="py-2">
        {loading && <Spinner aria-label="Default status example" />}
        {!loading && (
          <div className="snap-x">
            <ul className="mt-10 pb-2 w-full flex overflow-x-auto gap-4 snap-x">
              {list
                .filter((podcast) => {
                  isFeatured === true ? podcast.featured === true : true;
                })
                .filter((podcast) => podcast.tag === tag)
                .map((podcast, index) => {
                  return (
                    <SnapCenterCard
                      key={index}
                      tag={podcast.tag}
                      podcast={podcast}
                      handleClick={handlePlayPodcast}
                    ></SnapCenterCard>
                  );
                })}
            </ul>
          </div>
        )}
      </Accordion.Content>
    );
  else
    return (
      <div className="py-2">
        {loading && <Spinner aria-label="Default status example" />}
        {!loading && (
          <div className="snap-x">
            <ul className="mt-10 pb-2 w-full flex overflow-x-auto gap-4 snap-x">
              {list
                .filter((podcast) => {
                  isFeatured === true ? podcast.featured === true : true;
                })
                .sort((podA, podB) => {
                  const dateA = new Date(podA.date);
                  const dateB = new Date(podB.date);
                  return dateB - dateA;
                })
                .map((podcast, index) => {
                  return (
                    <SnapCenterCard
                      key={index}
                      tag={podcast.tag}
                      podcast={podcast}
                      handleClick={handlePlayPodcast}
                    ></SnapCenterCard>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    );
}

export default MakePodCasts;
