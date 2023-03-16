import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestOptions } from '../../api/api';

const Lesson = () => {
  const { courseId } = useParams()
  // console.log(courseId)

  const [lesson, setLesson] = useState(null);
  // console.log(lesson.lessons);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api.wisey.app/api/v1/core/preview-courses/${courseId}`, requestOptions);
        const result = await response.json();
        setLoading(false)
        setLesson(result);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchLesson()
  }, [courseId]);

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div>
      {lesson && (
        <>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          <img src={lesson.meta.courseVideoPreview.previewImageLink+'/' + 1 + '.webp'}></img>
          <ul>
            <h2>Список уроків:</h2>
            {lesson.lessons?.map(item => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <div className="w-[300px]">
                  <img src={item.previewImageLink + '/' + item.order + '.webp'} alt={item.title} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )

      }
    </div>
  )
}

export default Lesson
