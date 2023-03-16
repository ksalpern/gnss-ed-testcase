import React from "react";

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number) => (
          <li>
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
