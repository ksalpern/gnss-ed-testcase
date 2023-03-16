import React from 'react'

const Loading = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <img className='animate-spin w-24 ' src="/assets/loading.svg" alt="Loading..." />
    </div>
  )
}

export default Loading
