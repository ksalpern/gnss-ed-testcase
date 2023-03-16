import React from "react";

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="flex gap-4">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="#"
              onClick={() => paginate(number)}
            >{number}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
