import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { requestOptions } from "../../api/api";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);
  const lastCourseIndex = currentPage * coursesPerPage;
  const firstCourseIndex = lastCourseIndex - coursesPerPage;
  const currentCourse = courses.slice(firstCourseIndex, lastCourseIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const prevPage = () => setCurrentPage(prev => {
  //   if (prev === 1) {
  //     prev = 1
  //   }
  //   prev - 1
  // })
  // const nextPage = () => setCurrentPage(prev => prev + 1)

  console.log(courses);
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
    return <p>Loading...</p>;
  }

  return (
    <main className=" py-4 customContainer">
      {currentCourse.map((lesson) => (
        <Link key={lesson.id} to={`/${lesson.id}`}>
          <div className="w-[300px]">
            <img className="" src={lesson.previewImageLink + '/cover.webp'} alt={lesson.description} />
          </div>
          <div className="">
            <h2 className="text-xl">{lesson.title}</h2>
            <ul>
              {lesson.meta.skills?.map((skill) => (
                <li>{skill}</li>
              ))}
            </ul>
            <div className="">
              <p>Кількість уроків: <span className="font-medium">{lesson.lessonsCount}</span></p>
              <p>Рейтинг: <span>{lesson.rating}</span></p>
            </div>
          </div>
        </Link>
      ))}
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
