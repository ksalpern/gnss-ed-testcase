import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestOptions } from "../../api/api";
import Accordion from "../../components/Accordion/Accordion";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

const Lesson = () => {
  const { courseId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({}); // state to store progress
  // console.log(lesson);

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
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchLesson();
  }, [courseId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {lesson && (
        <div className="customContainer text-[#FAFAFA]  my-2">
          <div className="md:grid md:gap-3  md:grid-cols-2 ">
            <div className="">
              <h1>{lesson.title}</h1>
              <p>{lesson.description}</p>
            </div>

            <VideoPlayer
              className="w-full md:w-1/2"
              src={lesson.meta.courseVideoPreview.link}
              poster="https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1/lesson-1.webp"
            />

          </div>

          <h2 className="mt-3">List of lessons:</h2>
          <ul className="mb-3">
            {lesson.lessons?.map((item) => (
              <li key={item.id}>
                {item.status === "unlocked" && (
                  <Accordion title={item.title} disabled={false}>

                    <div className="w-full md:w-1/2">
                      <VideoPlayer
                        className=""
                        src={item.link}
                        poster={
                          item.previewImageLink +
                          "/lesson-" +
                          item.order +
                          ".webp"
                        }
                      />

                    </div>
                  </Accordion>
                )}
                <Accordion title={item.title} disabled={true} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {!lesson && <Error />}
    </div>
  );
};

export default Lesson;
