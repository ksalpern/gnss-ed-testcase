export const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMmYyNzk5Mi1iNGUxLTRhN2MtOGZjMS1hZWU4MzQ1YWE0MmIiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg5MzQ0MjUsImV4cCI6MTY3OTgzNDQyNX0.6qJGV80fy5NMcrANuYYUbiE_oSyUxZF8xttnXHmYXk0",
  },
};

// export const getCources = fetch(
//   "https://api.wisey.app/api/v1/core/preview-courses",
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

// export const getLesson = fetch(
//   "https://api.wisey.app/api/v1/core/preview-courses/:courseId",
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));
