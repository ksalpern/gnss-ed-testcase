import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestOptions } from "../../api/api";
import Hls from "hls.js";
import Accordion from "../../components/Accordion/Accordion";
import Loading from "../../components/Loading/Loading";

const Lesson = () => {
  const { courseId } = useParams();
  // console.log(courseId)

  const [lesson, setLesson] = useState(null);
  // console.log(lesson.lessons);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.wisey.app/api/v1/core/preview-courses/${courseId}`,
          requestOptions
        );
        const result = await response.json();
        setLoading(false);
        setLesson(result);
        if (result?.lessons?.length) {
          const video = document.querySelector("video");
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(result.lessons[0].link);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
              video.play();
            });
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = result.lessons[0].link;
            video.addEventListener("loadedmetadata", function () {
              video.play();
            });
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchLesson();
  }, [courseId]);

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {lesson && (
        <div className="customContainer text-[#FAFAFA] ">
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          {/* <img src={lesson.meta.courseVideoPreview.previewImageLink + '/lesson-' + 1 + '.webp'}></img> */}
          <ul className="mb-3">
            <h2>List of lessons:</h2>
            {lesson.lessons?.map((item) => (
              <li key={item.id}>
                {item.status === "unlocked" && (
                  <Accordion title={item.title}
                    disabled={false}
                  >
                    {/* <h3>{item.title}</h3> */}

                    <div className="w-[300px]">
                      {/* <img src={item.previewImageLink + '/lesson-' + item.order + '.webp'} alt={item.title} /> */}
                      <video
                        controls
                        preload="metadata"
                        poster={item.previewImageLink + '/lesson-' + item.order + '.webp'}
                        // src={item.link}
                        src='/assets/test.MP4'
                      ></video>
                    </div>
                  </Accordion>
                )}
                <Accordion title={item.title} disabled={true} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Lesson;
