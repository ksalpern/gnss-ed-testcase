export const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNzAwYjBlNS0xZTBlLTQxYmYtOGVkNy1lZDk1YzgyYTBmNWMiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg5MjkxMTcsImV4cCI6MTY3OTgyOTExN30.XJjYWrGwjPM0F9ooCN60w5AoFyiemNCGcuA7MvcraZU",
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
