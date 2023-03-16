import React, { useState } from 'react'

function Accordion({ title, children, disabled }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (disabled) {
      setIsOpen(false)
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className={`accordion border-b border-main-color cursor-pointer py-1 smd:py-3 ${disabled ? 'cursor-not-allowed' : ''}`}>
      <h3
        className='accordion-header text-lg md:text-2xl flex items-center justify-between '
        onClick={handleClick}
      >
        <p className={`font-semibold p-0 flex ${disabled ? 'text-slate-800' : ''}`}>
          {disabled ? (<img className='mr-3' src="/assets/lock.svg" alt="locked lesson" />)
            : (
              <img className='mr-3' src="/assets/unlock.svg" alt="unlocked lesson" />
            )}
          {title}</p>
        <img
          className={` duration-100 ${isOpen && !disabled ? 'rotate-180' : ''}`}
          src='/assets/arrow.svg'
        />


      </h3>
      {isOpen && <div className=''>{children}</div>}
    </div>
  )
}

export default Accordion