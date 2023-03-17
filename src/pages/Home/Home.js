import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { requestOptions } from "../../api/api";
import HoverComponent from "../../components/HoverVideo/HoverVideo";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);
  const lastCourseIndex = currentPage * coursesPerPage;
  const firstCourseIndex = lastCourseIndex - coursesPerPage;
  const currentCourse = courses.slice(firstCourseIndex, lastCourseIndex);
  // console.log(currentCourse)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log(courses);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.wisey.app/api/v1/core/preview-courses`,
          requestOptions
        );
        const result = await response.json();
        setLoading(false);
        setCourses(result.courses);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <main className="customContainer">
      <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[90vh]">
        {currentCourse.map((lesson) => (
          <Link className="grid courseCard" key={lesson.id} to={`/${lesson.id}`}>
            <div className="border border-[#01B7C5] bg-[#2C2F48]  bg-opacity-50 rounded-3xl overflow-hidden p-3 hover:bg-opacity-70 duration-200 ">
              <div className="w-full mb-2 videoHover">
                <img
                  className="rounded"
                  src={lesson.previewImageLink + "/cover.webp"}
                  alt={lesson.description}
                />
                <video className='hover-component'  loop autoPlay muted 
                src='/assets/test.mp4'
                // src={lesson.meta.courseVideoPreview.previewImageLink}
                // ref={videoRef}
                ></video>
                {/* <HoverComponent classProp='hover-component'
                 src={lesson.meta.courseVideoPreview.previewImageLink}
                // src='/assets/test.mp4'
                 /> */}
              </div>
              <div className="">
                <h2 className="text-xl border-b">{lesson.title}</h2>
                <div className="flex gap-3 justify-between mt-2">
                  <p>
                    Number of lessons:{" "}
                    <span className="font-medium">{lesson.lessonsCount}</span>
                  </p>
                  <p>
                    Rating: <span className="font-medium">{lesson.rating}</span>
                  </p>
                </div>
                <ul>
                  {lesson.meta.skills?.map((skill) => (
                    <li key={skill}>- {skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        coursesPerPage={coursesPerPage}
        totalCourses={courses.length}
        paginate={paginate}
      />
      {/* <button onClick={prevPage}>Prev Page</button>
      <button onClick={nextPage}>Next Page</button> */}
    </main>
  );
};

export default Home;
