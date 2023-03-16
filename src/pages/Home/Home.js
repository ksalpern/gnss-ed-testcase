import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { requestOptions } from "../../api/api";

const Home = () => {
  const [courses, setCourses] = useState([]);

  console.log(courses);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://api.wisey.app/api/v1/core/preview-courses`, requestOptions);
        const result = await response.json();
        setCourses(result.courses);
      } catch (error) {
        console.log("error", error);
      }
    };
    
    fetchCourses();
  }, []);

  return (
    <div>
      home
      {courses.map((lesson) => (
        <Link key={lesson.id} to={`/${lesson.id}`}>
          <li>{lesson.title}</li>
        </Link>
      ))}
    </div>
  );
};

export default Home;
