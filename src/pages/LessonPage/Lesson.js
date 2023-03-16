import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestOptions } from '../../api/api';

const Lesson = () => {
  const { courseId } = useParams()
  console.log(courseId)

  const [lesson, setLesson] = useState(null);
  console.log(lesson);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`https://api.wisey.app/api/v1/core/preview-courses/${courseId}`, requestOptions);
        const result = await response.json();
        setLesson(result);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchLesson()
  }, [courseId]);

  return (
    <div>
      {lesson && (
        <>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
        </>
      )

      }
    </div>
  )
}

export default Lesson
