import React from "react";

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="block w-full">
      <ul className="flex gap-4 justify-center">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="#"
              onClick={() => paginate(number)}
            >{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
