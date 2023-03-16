import React from 'react'
import { useParams } from 'react-router-dom'

const Lesson = () => {
  const { courseId } = useParams()
  return (
    <div>
      lesson
    </div>
  )
}

export default Lesson
