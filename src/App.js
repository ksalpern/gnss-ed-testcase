import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Lesson from "./pages/LessonPage/Lesson";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="app w-full max-w-7xl mx-auto text-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path=":courseId" element={<Lesson />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
