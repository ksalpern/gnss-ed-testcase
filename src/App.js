import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Lesson from "./pages/LessonPage/Lesson";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="app">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path=":courseId" element={<Lesson />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
