import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { requestOptions } from "../../api/api";
import Hls from "hls.js";
import Accordion from "../../components/Accordion/Accordion";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error";

const Lesson = () => {
  const { courseId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  // const [progress, setProgress] = useState(0);
  const [progress, setProgress] = useState({}); // state to store progress
  console.log(lesson);

  // function handleTimeUpdate(e) {
  //   const time = e.target.currentTime;
  //   localStorage.setItem('lessonProgress', time);
  //   setProgress(time);
  // }

  useEffect(() => {
    // const fetchLesson = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(
    //       `https://api.wisey.app/api/v1/core/preview-courses/${courseId}`,
    //       requestOptions
    //     );
    //     const result = await response.json();
    //     setLoading(false);
    //     setLesson(result);
    //     if (result?.lessons?.length) {
    //       const video = document.querySelector("video");
    //       if (Hls.isSupported()) {
    //         const hls = new Hls();
    //         hls.loadSource(result.lessons[0].link);
    //         hls.attachMedia(video);
    //         hls.on(Hls.Events.MANIFEST_PARSED, function () {
    //           video.play();
    //         });
    //       } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    //         video.src = result.lessons[0].link;
    //         video.addEventListener("loadedmetadata", function () {
    //           video.play();
    //         });
    //       }
    //     }
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };
    // fetchLesson();
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
        console.log(lesson);
        console.log(lesson.meta.courseVideoPreview.link);
        if (result?.lessons?.length) {
          const video = videoRef.current;
          if (Hls.isSupported()) {
            const hls = new Hls();
            // hls.loadSource(result?.lessons[0].link);
            // hls.loadSource(result?.lessons.map(item=>item.link));
            hls.loadSource(result.meta.courseVideoPreview.link);
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

          // get progress from localStorage
          const savedProgress = localStorage.getItem(courseId);
          if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
          }

          video.addEventListener("timeupdate", () => {
            const newProgress = { ...progress };
            newProgress[result.lessons[0].id] = video.currentTime;
            setProgress(newProgress);
            // save progress to localStorage
            localStorage.setItem(courseId, JSON.stringify(newProgress));
          });
        }
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
        <div className="customContainer text-[#FAFAFA] ">
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          {/* <p>{lesson.meta.courseVideoPreview.duration}</p> */}
          {/* <img src={lesson.meta.courseVideoPreview.previewImageLink + '/lesson-' + 1 + '.webp'}></img> */}
          
            <video
            className="w-full md:w-1/2"
              controls
              preload="metadata"
              // poster={lesson.meta.courseVideoPreview.previewImageLink + '/lesson-' + item.order + '.webp' }
              poster={lesson.previewImageLink}
              // src={lesson.link}
              // src={lesson.meta.courseVideoPreview.link}
              src="/assets/test.MP4"
            ></video>
          {/* <video onTimeUpdate={handleTimeUpdate} controls>
            <source src="/assets/test.MP4" type="video/mp4" />
          </video>
          <p>Progress: {progress.toFixed(2)} seconds</p> */}
          <video
            controls
            preload="metadata"
            poster={lesson.previewImageLink}
            // src={lesson.lessons[0].link}
            src={lesson.meta.courseVideoPreview.link}
            ref={videoRef}
          ></video>
          <h2 className="mt-3">List of lessons:</h2>
          <ul className="mb-3">
            {lesson.lessons?.map((item) => (
              <li key={item.id}>
                {item.status === "unlocked" && (
                  <Accordion title={item.title} disabled={false}>
                    {/* <h3>{item.title}</h3> */}

                    <div className="w-[300px]">
                      {/* <img src={item.previewImageLink + '/lesson-' + item.order + '.webp'} alt={item.title} /> */}
                      <video
                        controls
                        preload="metadata"
                        ref={videoRef}
                        poster={
                          item.previewImageLink +
                          "/lesson-" +
                          item.order +
                          ".webp"
                        }
                        // src={item.link}
                        src="/assets/test.MP4"
                      ></video>
                      <video
                        controls
                        preload="metadata"
                        ref={videoRef}
                        poster={item.previewImageLink}
                        src={item.link}
                      ></video>
                      {/* <video ref={videoRef} controls poster={item.previewImageLink} src={item.link}></video> */}
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
