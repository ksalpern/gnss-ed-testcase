import React from "react";

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="block w-full">
      <ul className="flex flex-wrap gap-4 justify-center mb-3">
        {pageNumbers.map((number) => (
          <li
            className=" "
            key={number}
          >
            <a href="#" className="btn" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
